import { IUserProject, UserRole } from '@/entities';
import { ProjectRepository, UserRepository } from '@/infra/db/repositories';
import { AddUserToProjectRequestDTO } from '@/infra/http/dtos';
import {
  BadRequestError,
  InvalidParamError,
  UnauthorizedError,
} from '@/util/errors';

export class AddUserToProjectUseCase {
  private userRepository: UserRepository;
  private projectRepository: ProjectRepository;

  constructor(userRepository: UserRepository, projectRepository: ProjectRepository) {
    this.userRepository = userRepository;
    this.projectRepository = projectRepository;
  }

  async execute(
    data: AddUserToProjectRequestDTO,
    inviterId: number
  ): Promise<null | IUserProject> {
    const inviter = await this.userRepository.getUser({ id: inviterId });
    if (
      inviter.projects.find((p: IUserProject) => p.project.id == data.projectId)
        .role == UserRole.ADMIN &&
      (data.role == UserRole.ADMIN || data.role == UserRole.OWNER)
    ) {
      throw new UnauthorizedError(
        `You have no permission to add a user as ${data.role} to this project`
      );
    }
    
    if ((await this.projectRepository.getProject(data.projectId)).users.find((p: IUserProject) => p.user.email == data.email)) {
      throw new BadRequestError('User already in project');
    }

    const user = await this.userRepository.getUser({ email: data.email });
    if (!user) {
      throw new InvalidParamError("User doesn't exist");
    }

    const userProject = await this.userRepository.addUserToProject({
      userId: user.id,
      projectId: data.projectId,
      role: data.role,
    });

    return userProject;
  }
}
