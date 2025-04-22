import { HashProvider, JwtProvider } from '@/utils/security';
import { IUserProject, IUserRole, IUser } from '@/models';
import { ProjectRepository, UserRepository } from '@/repositories';
import { UnauthorizedError, BadRequestError } from '@/utils/errors';
import { ForbiddenError } from '@/utils/errors/forbidden-error';
import { ProjectService, ChangeService } from '@/services';
import { AUTH_SECRET, HASH_SALT } from '@/config/env';
import {
  AddUserToProjectRequestDTO,
  AuthenticateUserRequestDTO,
  ChangeUserRoleRequestDTO,
  CreateUserRequestDTO,
  ForgotPasswordRequestDTO,
  RemoveUserFromProjectRequestDTO,
  ResetPasswordRequestDTO,
  UpdateUserRequestDTO,
  ValidateUserRequestDTO,
} from '@/infra/http/dtos';
import { AuthenticateUserResponseDTO } from '@/infra/http/dtos/authenticate-user-response-dto';
import { CryptoProvider } from '@/utils/security/crypto-provider';
import { EmailProvider } from '@/utils/email/email-provider';
import { TemplateProvider } from '@/utils/email/template-provider';
import { generatePasswordRecoveryCode } from '@/utils/security/random-code-generator';
import { VerifyRecoveryCodeRequestDTO } from '@/infra/http/dtos/verify-recovery-code-dto';

export class UserService {
  constructor(
    private hashSalt = Number(HASH_SALT),
    private userRepository = new UserRepository(),
    private projectRepository = new ProjectRepository(),
    private projectService = new ProjectService(),
    private changeService = new ChangeService(),
    private emailProvider = new EmailProvider(),
    private templateProvider = new TemplateProvider()
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
      role: data.role!,
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
    requesterId: string
  ): Promise<IUserProject | null> {
    const requester = await this.userRepository.getUser({ _id: requesterId });
    const project = await this.projectRepository.getProject(data.projectId);
    const owner = project?.users.find(
      (userProject) => userProject.role == IUserRole.PROPRIETARIO
    );
    const admins = project?.users.map((userProject) => {
      if (userProject.role == IUserRole.ADMINISTRADOR)
        return userProject.user.id;
    });
    const requesterProjectRole = requester?.projects?.find(
      (p: IUserProject) => p.project.toString() === data.projectId
    )?.role;
    if (requesterProjectRole == IUserRole.ADMINISTRADOR) {
      if (
        data.newRole == IUserRole.ADMINISTRADOR ||
        data.newRole == IUserRole.PROPRIETARIO ||
        data.userId == owner?.user.id ||
        admins?.includes(data.userId)
      ) {
        throw new UnauthorizedError(
          `Você não tem permissão para realizar esta ação`
        );
      }
    }

    const targetUser = project?.users.find(
      (u: IUserProject) => u.user.id === data.userId
    );

    if (!targetUser) {
      throw new BadRequestError(`O usuário não faz parte deste projeto.`);
    }

    const beforeChange = await this.projectService.getCleanProject(
      data.projectId
    );

    const updatedUserProject = await this.userRepository.changeUserRole({
      userId: data.userId,
      projectId: data.projectId,
      newRole: data.newRole,
    });

    const afterChange = await this.projectService.getCleanProject(
      data.projectId
    );

    if (beforeChange && afterChange) {
      await this.changeService.createChange(
        beforeChange,
        afterChange,
        data.projectId,
        updatedUserProject?.user.name,
        requesterId
      );
    }

    return updatedUserProject;
  }

  async removeUserFromProject(
    data: RemoveUserFromProjectRequestDTO,
    requesterId: string
  ): Promise<void> {
    const requester = await this.userRepository.getUser({ _id: requesterId });

    const requesterProjectRole = requester?.projects?.find(
      (p: IUserProject) => p.project.toString() === data.projectId
    )?.role;

    const project = await this.projectRepository.getProject(data.projectId);
    const admins = project?.users.map((userProject) => {
      if (userProject.role == IUserRole.ADMINISTRADOR)
        return userProject.user.id;
    });

    const targetUser = project?.users.find(
      (u: IUserProject) => u.user.id === data.userId
    );

    if (!targetUser) {
      throw new BadRequestError(`O usuário não faz parte deste projeto.`);
    }

    if (
      targetUser.role === IUserRole.PROPRIETARIO &&
      (requesterProjectRole !== IUserRole.PROPRIETARIO ||
        admins?.includes(data.userId))
    ) {
      throw new UnauthorizedError(
        `Somente o proprietário do projeto pode remover outro proprietário ou administrador.`
      );
    }

    const beforeChange = await this.projectService.getCleanProject(
      data.projectId
    );

    await this.userRepository.removeUserFromProject({
      userId: data.userId,
      projectId: data.projectId,
    });

    const afterChange = await this.projectService.getCleanProject(
      data.projectId
    );

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
      throw new ForbiddenError('Senha incorreta');
    }
    const hasher = new HashProvider(this.hashSalt);
    const isPasswordCorrect = await hasher.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new ForbiddenError('Senha incorreta');
    }
    if (!user.validated) {
      throw new ForbiddenError('Valide sua conta através do e-mail enviado');
    }
    const encrypter = new JwtProvider(AUTH_SECRET || '');
    const token = await encrypter.encrypt(user.id);
    return new AuthenticateUserResponseDTO({
      id: user.id,
      name: user.name,
      email: user.email,
      token,
      projects: user.projects,
    });
  }

  async forgotPassword(
    data: ForgotPasswordRequestDTO
  ): Promise<{ success: boolean }> {
    const { email } = data;
    const user = await this.userRepository.getUser({ email });
    if (!user || !user?.id) {
      throw new ForbiddenError('Usuário inexistente');
    }
    const firstName = user.name.split(' ')?.[0];
    const recoveryCode = generatePasswordRecoveryCode();

    const htmlTemplate = this.templateProvider.compileTemplate(
      'forgot-password',
      {
        name: firstName,
        recoveryCode,
      }
    );
    await this.emailProvider.send(email, 'Recuperação de senha', htmlTemplate);
    await this.userRepository.updateUser(user.id, { recoveryCode });
    return {
      success: true,
    };
  }

  async verifyRecoveryCode(
    data: VerifyRecoveryCodeRequestDTO
  ): Promise<{ verifyToken: string }> {
    const { email } = data;
    const user = await this.userRepository.getUser({ email });
    if (!user || !user?.id) {
      throw new ForbiddenError('Usuário inexistente');
    }

    if (data.recoveryCode !== user.recoveryCode) {
      throw new ForbiddenError('Código de recuperação inválido');
    }
    const verifyToken = CryptoProvider.encrypt(`${email}:${user.name}`);

    await this.userRepository.updateUser(user.id, {
      validated: true,
      recoveryCode: null,
    });
    return {
      verifyToken,
    };
  }

  async resetPassword(
    data: ResetPasswordRequestDTO
  ): Promise<{ success: boolean }> {
    const { verifyToken, password } = data;
    const decrypted = CryptoProvider.decrypt(verifyToken);
    if (!decrypted) {
      throw new ForbiddenError('Não autorizado.');
    }
    const [email] = decrypted.split(':');
    if (!email) {
      throw new ForbiddenError('Não autorizado.');
    }
    const user = await this.userRepository.getUser({ email });
    if (!user || !user?.id) {
      throw new ForbiddenError('Usuário inexistente.');
    }

    const hasher = new HashProvider(this.hashSalt);
    const hash = await hasher.hash(password);

    await this.userRepository.updateUser(user.id, {
      password: hash,
    });

    return {
      success: true,
    };
  }

  async validateUser(
    data: ValidateUserRequestDTO
  ): Promise<{ success: boolean }> {
    const { verifyToken } = data;
    const decrypted = CryptoProvider.decrypt(verifyToken);
    if (!decrypted) {
      throw new ForbiddenError('Não autorizado.');
    }
    const [email] = decrypted.split(':');
    if (!email) {
      throw new ForbiddenError('Não autorizado.');
    }
    const user = await this.userRepository.getUser({ email });
    if (!user || !user?.id) {
      throw new ForbiddenError('Usuário inexistente.');
    }

    await this.userRepository.updateUser(user.id, {
      validated: true,
    });

    return {
      success: true,
    };
  }

  async createUser(data: CreateUserRequestDTO): Promise<{ success: boolean }> {
    const hasher = new HashProvider(this.hashSalt);
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
      const firstName = user.name.split(' ')?.[0];
      const verifyToken = CryptoProvider.encrypt(`${email}:${user.name}`);
      const validateUrl = `${process.env.WEB_URL}/login?verifyToken=${verifyToken}`;
      const htmlTemplate = this.templateProvider.compileTemplate(
        'validate-user',
        {
          name: firstName,
          validateUrl,
        }
      );

      await this.emailProvider.send(email, 'Ativação de conta', htmlTemplate);
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
  }

  async getMe(id: String): Promise<null | AuthenticateUserResponseDTO> {
    const user = await this.getUser(id);
    if (user && user?.id) {
      const { name, email, projects } = user;
      const encrypter = new JwtProvider(AUTH_SECRET || '');
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

  async updateUser(
    id: String,
    data: UpdateUserRequestDTO
  ): Promise<IUser | null> {
    const user = await this.userRepository.getUser({ _id: id });
    if (!user) {
      throw new BadRequestError('Usuário inválido ou inexistente');
    }
    let hash: string = '';
    const hasher = new HashProvider(this.hashSalt);
    if (data.newPassword?.length) {
      hash = await hasher.hash(data.newPassword);
    }

    return this.userRepository.updateUser(id, {
      ...data,
      password: data.newPassword ? hash : user.password,
    });
  }

  async deleteUser(id: String): Promise<void> {
    const user = await this.userRepository.getUser({ _id: id });
    if (!user) {
      throw new BadRequestError('Usuário inválido ou inexistente');
    }

    await this.userRepository.deleteUser(id);
  }
}
