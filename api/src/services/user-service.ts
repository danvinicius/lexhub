import {
  AddUserToProjectRequestDTO,
  AuthenticateUserRequestDTO,
  AuthenticateUserResponseDTO,
  CreateUserRequestDTO,
} from '@/infra/http/dtos';
import { UpdateUserRequestDTO } from '@/infra/http/dtos/update-user-request-dto';
import { BcryptService, JwtService } from '@/infra/security';
import { IUserProject, UserRole, IUser } from '@/models';
import { ProjectRepository, UserRepository } from '@/repositories';
import {
  UnauthorizedError,
  BadRequestError,
} from '@/utils/errors';
import { ForbiddenError } from '@/utils/errors/forbidden-error';

const userRepository = new UserRepository();
const projectRepository = new ProjectRepository();
const encrypter = new JwtService(process.env.AUTH_SECRET);
const hasher = new BcryptService(10);

export class UserService {
  async addUserToProject(
    data: AddUserToProjectRequestDTO,
    inviterId: string
  ): Promise<null | IUserProject> {
    
    const inviter = await userRepository.getUser({ _id: inviterId });
    
    if (
      inviter.projects.find((p: IUserProject) => p.project.id == data.projectId)
        ?.role == UserRole.ADMIN &&
      (data.role == UserRole.ADMIN || data.role == UserRole.OWNER)
    ) {
      throw new UnauthorizedError(
        `Você não tem permissão para realizar esta ação`
      );
    }

    if (
      (await projectRepository.getProject(data.projectId)).users.find(
        (p: IUserProject) => p.user.email == data.email
      )
    ) {
      throw new BadRequestError('Este usuário já está neste projeto');
    }

    const user = await userRepository.getUser({ email: data.email });
    if (!user) {
      throw new BadRequestError(`O usuário com e-mail ${data.email} não existe`);
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
      throw new ForbiddenError('Senha incorreta ou usuário inexistente');
    }
    const isPasswordCorrect = await hasher.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new ForbiddenError('Senha incorreta ou usuário inexistente');
    }
    const token = await encrypter.encrypt(user.id);
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
      throw new BadRequestError('Já existe uma conta com este endereço de e-mail');
    }
    const { email } = await userRepository.createUser({
      ...data,
      password: hash,
    });
    const user = await userRepository.getUser({ email });
    
    if (user) {
      const { name, email, projects } = user;
      const token = await encrypter.encrypt(user.id);
      return new AuthenticateUserResponseDTO({
        name,
        email,
        token,
        projects,
      });
    }
    return null;
  }

  async getMe(id: string): Promise<null | AuthenticateUserResponseDTO> {
    const user = await this.getUser(id);
    const { name, email, projects } = user;
    const token = await encrypter.encrypt(user.id);
    return new AuthenticateUserResponseDTO({
      name,
      email,
      token,
      projects,
    });
  }

  async getUser(id: string): Promise<null | IUser> {
    const user = await userRepository.getUserById(id);
    if (!user) {
      throw new BadRequestError('Este usuário não existe');
    }
    return user;
  }

  async updateUser(
    id: string,
    data: UpdateUserRequestDTO
  ): Promise<IUser> {
    const userExists = await userRepository.getUser({_id: id});
    if (!userExists) {
      throw new BadRequestError('Usuário inválido ou inexistente');
    }
    let hash: string;
    if (data.currentPassword.length && data.newPassword.length) {
      await this.checkPassword(data.currentPassword, userExists.password);
      hash = await hasher.hash(data.newPassword);
    }
    
    return userRepository.updateUser(id, {
      ...data,
      password: data.currentPassword ? hash : userExists.password
    });
  }

  private async checkPassword(checkPassword: string, userPassword: string) {
    const isPasswordCorrect = await hasher.compare(checkPassword, userPassword);
    if (!isPasswordCorrect) {
      throw new ForbiddenError('Senha incorreta');
    }
  }
}
