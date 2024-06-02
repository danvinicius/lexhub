import { ProjectRepository, UserRepository } from '@/infra/db/protocols';

import {
  GetProjectUseCase,
  GetAllProjectsUseCase,
  CreateProjectUseCase,
  UpdateProjectUseCase,
  DeleteProjectUseCase,
} from '@/use-cases/project';
import { ProjectController } from '@/controllers';

export class ProjectControllerFactory {
  static makeProjectController(projectRepository: ProjectRepository, userRepository: UserRepository) {
    return new ProjectController(
      new GetProjectUseCase(projectRepository),
      new GetAllProjectsUseCase(projectRepository),
      new CreateProjectUseCase(projectRepository, userRepository),
      new UpdateProjectUseCase(projectRepository),
      new DeleteProjectUseCase(projectRepository)
    );
  }
}
