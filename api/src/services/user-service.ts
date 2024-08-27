import {
  AddUserToProjectRequestDTO,
  AuthenticateUserRequestDTO,
  AuthenticateUserResponseDTO,
  CreateUserRequestDTO,
} from '@/infra/http/dtos';
import { BcryptService, JwtService } from '@/infra/security';
import { IUserProject, UserRole, IUser } from '@/models';
import { ProjectRepository, UserRepository } from '@/repositories';
import {
  UnauthorizedError,
  BadRequestError,
  InvalidParamError,
  EmailInUseError,
  NotFoundError,
} from '@/utils/errors';

const userRepository = new UserRepository();
const projectRepository = new ProjectRepository();
const encrypter = new JwtService(process.env.AUTH_SECRET);
const hasher = new BcryptService(10);

export class UserService {
  async addUserToProject(
    data: AddUserToProjectRequestDTO,
    inviterId: number
  ): Promise<null | IUserProject> {
    const inviter = await userRepository.getUser({ id: inviterId });
    if (
      inviter.projects.find((p: IUserProject) => p.project.id == data.projectId)
        .role == UserRole.ADMIN &&
      (data.role == UserRole.ADMIN || data.role == UserRole.OWNER)
    ) {
      throw new UnauthorizedError(
        `You have no permission to add a user as ${data.role} to this project`
      );
    }

    if (
      (await projectRepository.getProject(data.projectId)).users.find(
        (p: IUserProject) => p.user.email == data.email
      )
    ) {
      throw new BadRequestError('User already in project');
    }

    const user = await userRepository.getUser({ email: data.email });
    if (!user) {
      throw new InvalidParamError("User doesn't exist");
    }

    const userProject = await userRepository.addUserToProject({
      userId: user.id,
      projectId: data.projectId,
      role: data.role,
    });

    return userProject;
  }

  async authenticateUser(
    data: AuthenticateUserRequestDTO
  ): Promise<null | AuthenticateUserResponseDTO> {
    const { email, password } = data;
    const user = await userRepository.getUser({ email });
    if (!user) {
      throw new InvalidParamError('email');
    }
    const isPasswordCorrect = await hasher.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedError('Invalid password');
    }
    const token = await encrypter.encrypt(String(user.id));
    return new AuthenticateUserResponseDTO({
      name: user.name,
      email: user.email,
      token,
      projects: user.projects,
    });
  }

  async createUser(
    data: CreateUserRequestDTO
  ): Promise<null | AuthenticateUserResponseDTO> {
    const hash = await hasher.hash(data.password);
    const alreadyExists = await userRepository.getUser({
      email: data.email,
    });
    if (alreadyExists) {
      throw new EmailInUseError();
    }
    const { email } = await userRepository.createUser({
      ...data,
      password: hash,
    });
    if (!email) {
      throw new Error('Something went wrong');
    }
    const user = await userRepository.getUser({ email });
    if (user) {
      const { name, email, projects } = user;
      const token = await encrypter.encrypt(String(user.id));
      return new AuthenticateUserResponseDTO({
        name,
        email,
        token,
        projects,
      });
    }
    return null;
  }

  async getMe(id: number): Promise<null | AuthenticateUserResponseDTO> {
    const user = await this.getUser(id);
    if (!user) {
      throw new NotFoundError('This user does not exist');
    }
    const { name, email, projects } = user;
    const token = await encrypter.encrypt(String(user.id));
    return new AuthenticateUserResponseDTO({
      name,
      email,
      token,
      projects,
    });
  }

  async getUser(id: number): Promise<null | IUser> {
    const user = await userRepository.getUser({ id });
    if (!user) {
      throw new NotFoundError('This user does not exist');
    }
    return user;
  }
}
