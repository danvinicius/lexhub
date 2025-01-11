import { BcryptService, JwtService } from '@/infra/security';
import { IUserProject, IUserRole, IUser } from '@/models';
import { ProjectRepository, UserRepository } from '@/repositories';
import { UnauthorizedError, BadRequestError } from '@/utils/errors';
import { ForbiddenError } from '@/utils/errors/forbidden-error';
import { ProjectService } from './project-service';
import { ChangeService } from './change-service';
import { AUTH_SECRET, HASH_SALT } from '@/config/env';
import {
  AddUserToProjectRequestDTO,
  AuthenticateUserRequestDTO,
  ChangeUserRoleRequestDTO,
  CreateUserRequestDTO,
  RemoveUserFromProjectRequestDTO,
  UpdateUserRequestDTO,
} from '@/infra/http/dtos';
import { AuthenticateUserResponseDTO } from '@/infra/http/dtos/authenticate-user-response-dto';

export class UserService {
  constructor(
    private hashSalt = Number(HASH_SALT),
    private userRepository = new UserRepository(),
    private projectRepository = new ProjectRepository(),
    private projectService = new ProjectService(),
    private changeService = new ChangeService()
  ) {}

  async addUserToProject(
    data: AddUserToProjectRequestDTO,
    inviterId: String
  ): Promise<null | IUserProject> {
    const inviter = await this.userRepository.getUser({ _id: inviterId });

    if (
      inviter?.projects?.find(
        (p: IUserProject) => p.project.id == data.projectId
      )?.role == IUserRole.ADMINISTRADOR &&
      (data.role == IUserRole.ADMINISTRADOR ||
        data.role == IUserRole.PROPRIETARIO)
    ) {
      throw new UnauthorizedError(
        `Você não tem permissão para realizar esta ação`
      );
    }

    if (
      (await this.projectRepository.getProject(data.projectId))?.users.find(
        (p: IUserProject) => p.user.email == data.email
      )
    ) {
      throw new BadRequestError('Este usuário já está neste projeto');
    }

    const user = await this.userRepository.getUser({ email: data.email });
    if (!user || !user?.id) {
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
    if (beforeChange && afterChange) {
      await this.changeService.createChange(
        beforeChange,
        afterChange,
        data.projectId,
        user.name,
        inviterId
      );
    }
    return userProject;
  }

  async changeUserRole(
    data: ChangeUserRoleRequestDTO,
    inviterId: string
  ): Promise<IUserProject | null> {
    const inviter = await this.userRepository.getUser({ _id: inviterId });

    if (
      inviter?.projects?.find(
        (p: IUserProject) => p.project.id == data.projectId
      )?.role == IUserRole.ADMINISTRADOR &&
      (data.newRole == IUserRole.ADMINISTRADOR ||
        data.newRole == IUserRole.PROPRIETARIO)
    ) {
      throw new UnauthorizedError(
        `Você não tem permissão para realizar esta ação`
      );
    }

    // Buscar o projeto para verificar se o usuário já está associado
    const project = await this.projectRepository.getProject(data.projectId);
    const targetUser = project?.users.find(
      (u: IUserProject) => u.user.id === data.userId
    );

    if (!targetUser) {
      throw new BadRequestError(`O usuário não faz parte deste projeto.`);
    }

    // Obter o estado do projeto antes da alteração
    const beforeChange = await this.projectService.getCleanProject(
      data.projectId
    );

    // Chamar o repositório para alterar o cargo
    const updatedUserProject = await this.userRepository.changeUserRole({
      userId: data.userId,
      projectId: data.projectId,
      newRole: data.newRole,
    });

    // Obter o estado do projeto após a alteração
    const afterChange = await this.projectService.getCleanProject(
      data.projectId
    );

    // Registrar a alteração
    if (beforeChange && afterChange) {
      await this.changeService.createChange(
        beforeChange,
        afterChange,
        data.projectId,
        updatedUserProject?.user.name,
        inviterId
      );
    }

    return updatedUserProject;
  }

  async removeUserFromProject(
    data: RemoveUserFromProjectRequestDTO,
    requesterId: string
  ): Promise<void> {
    const requester = await this.userRepository.getUser({ _id: requesterId });

    // Garantir que o solicitante tenha permissão para remover usuários
    const requesterProjectRole = requester?.projects?.find(
      (p: IUserProject) => p.project.toString() === data.projectId
    )?.role;

    if (
      requesterProjectRole !== IUserRole.ADMINISTRADOR &&
      requesterProjectRole !== IUserRole.PROPRIETARIO
    ) {
      throw new UnauthorizedError(
        `Você não tem permissão para remover usuários deste projeto.`
      );
    }

    // Impedir que um ADMIN remova um OWNER
    const project = await this.projectRepository.getProject(data.projectId);
    const targetUser = project?.users.find(
      (u: IUserProject) => u.user.id === data.userId
    );

    if (!targetUser) {
      throw new BadRequestError(`O usuário não faz parte deste projeto.`);
    }

    if (
      targetUser.role === IUserRole.PROPRIETARIO &&
      requesterProjectRole !== IUserRole.PROPRIETARIO
    ) {
      throw new UnauthorizedError(
        `Somente o proprietário do projeto pode remover outro proprietário.`
      );
    }

    // Obter o estado do projeto antes da alteração
    const beforeChange = await this.projectService.getCleanProject(
      data.projectId
    );

    // Chamar o repositório para remover o usuário
    await this.userRepository.removeUserFromProject({
      userId: data.userId,
      projectId: data.projectId,
    });

    // Obter o estado do projeto após a alteração
    const afterChange = await this.projectService.getCleanProject(
      data.projectId
    );

    // Registrar a remoção
    if (beforeChange && afterChange) {
      await this.changeService.createChange(
        beforeChange,
        afterChange,
        data.projectId,
        targetUser.user.name,
        requesterId
      );
    }
  }

  async authenticateUser(
    data: AuthenticateUserRequestDTO
  ): Promise<null | AuthenticateUserResponseDTO> {
    const { email, password } = data;
    const user = await this.userRepository.getUser({ email });
    if (!user || !user?.id) {
      throw new ForbiddenError('Senha incorreta ou usuário inexistente');
    }
    const hasher = new BcryptService(this.hashSalt);
    const isPasswordCorrect = await hasher.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new ForbiddenError('Senha incorreta ou usuário inexistente');
    }
    const encrypter = new JwtService(AUTH_SECRET || '');
    const token = await encrypter.encrypt(user.id);
    return new AuthenticateUserResponseDTO({
      id: user.id,
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

    if (user && user?.id) {
      const { name, email, projects } = user;
      const encrypter = new JwtService(AUTH_SECRET || '');
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
    if (user && user?.id) {
      const { name, email, projects } = user;
      const encrypter = new JwtService(AUTH_SECRET || '');
      const token = await encrypter.encrypt(user.id);
      return new AuthenticateUserResponseDTO({
        id,
        name,
        email,
        token,
        projects,
      });
    }
    return null;
  }

  async getUser(id: String): Promise<null | IUser> {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new BadRequestError('Este usuário não existe');
    }
    return user;
  }

  async updateUser(id: String, data: UpdateUserRequestDTO): Promise<IUser | null> {
    const user = await this.userRepository.getUser({ _id: id });
    if (!user) {
      throw new BadRequestError('Usuário inválido ou inexistente');
    }
    let hash: string = '';
    const hasher = new BcryptService(this.hashSalt);
    if (data.currentPassword?.length && data.newPassword?.length) {
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
