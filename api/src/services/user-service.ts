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
import { UnauthorizedError, BadRequestError } from '@/utils/errors';
import { ForbiddenError } from '@/utils/errors/forbidden-error';
import { ProjectService } from './project-service';
import { ChangeService } from './change-service';
import { AUTH_SECRET, HASH_SALT } from '@/config/env';

export class UserService {
  constructor(
    private hashSalt = Number(HASH_SALT),
    private userRepository = new UserRepository(),
    private projectRepository = new ProjectRepository(),
    private projectService = new ProjectService(),
    private changeService = new ChangeService(),
  ) {}

  async addUserToProject(
    data: AddUserToProjectRequestDTO,
    inviterId: String
  ): Promise<null | IUserProject> {
    const inviter = await this.userRepository.getUser({ _id: inviterId });

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
      (await this.projectRepository.getProject(data.projectId)).users.find(
        (p: IUserProject) => p.user.email == data.email
      )
    ) {
      throw new BadRequestError('Este usuário já está neste projeto');
    }

    const user = await this.userRepository.getUser({ email: data.email });
    if (!user) {
      throw new BadRequestError(
        `O usuário com e-mail ${data.email} não existe`
      );
    }

    const beforeChange = await this.projectService.getCleanProject(
      data.projectId
    );
    const userProject = await this.userRepository.addUserToProject({
      userId: user.id,
      projectId: data.projectId,
      role: data.role,
    });
    const afterChange = await this.projectService.getCleanProject(
      data.projectId
    );
    await this.changeService.createChange(
      beforeChange,
      afterChange,
      data.projectId,
      user.name,
      inviterId
    );

    return userProject;
  }

  async authenticateUser(
    data: AuthenticateUserRequestDTO
  ): Promise<null | AuthenticateUserResponseDTO> {
    const { email, password } = data;
    const user = await this.userRepository.getUser({ email });
    if (!user) {
      throw new ForbiddenError('Senha incorreta ou usuário inexistente');
    }
    const hasher = new BcryptService(this.hashSalt);
    const isPasswordCorrect = await hasher.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new ForbiddenError('Senha incorreta ou usuário inexistente');
    }
    const encrypter = new JwtService(AUTH_SECRET);
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
    const hasher = new BcryptService(this.hashSalt);
    const hash = await hasher.hash(data.password);
    const alreadyExists = await this.userRepository.getUser({
      email: data.email,
    });
    if (alreadyExists) {
      throw new BadRequestError(
        'Já existe uma conta com este endereço de e-mail'
      );
    }
    const { email } = await this.userRepository.createUser({
      ...data,
      password: hash,
    });
    const user = await this.userRepository.getUser({ email });

    if (user) {
      const { name, email, projects } = user;
      const encrypter = new JwtService(AUTH_SECRET);
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

  async getMe(id: String): Promise<null | AuthenticateUserResponseDTO> {
    const user = await this.getUser(id);
    const { name, email, projects } = user;
    const encrypter = new JwtService(AUTH_SECRET);
    const token = await encrypter.encrypt(user.id);
    return new AuthenticateUserResponseDTO({
      name,
      email,
      token,
      projects,
    });
  }

  async getUser(id: String): Promise<null | IUser> {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new BadRequestError('Este usuário não existe');
    }
    return user;
  }

  async updateUser(id: String, data: UpdateUserRequestDTO): Promise<IUser> {
    const user = await this.userRepository.getUser({ _id: id });
    if (!user) {
      throw new BadRequestError('Usuário inválido ou inexistente');
    }
    let hash: string;
    const hasher = new BcryptService(this.hashSalt);
    if (data.currentPassword.length && data.newPassword.length) {
      await this.checkPassword(data.currentPassword, user.password);
      hash = await hasher.hash(data.newPassword);
    }

    return this.userRepository.updateUser(id, {
      ...data,
      password: data.currentPassword ? hash : user.password,
    });
  }

  private async checkPassword(checkPassword: string, userPassword: string) {
    const hasher = new BcryptService(this.hashSalt);
    const isPasswordCorrect = await hasher.compare(checkPassword, userPassword);
    if (!isPasswordCorrect) {
      throw new ForbiddenError('Senha incorreta');
    }
  }
}
