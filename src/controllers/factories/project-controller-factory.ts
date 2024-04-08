import { ProjectRepository } from '@/protocols';

import {
  GetProjectUseCase,
  GetAllProjectsUseCase,
  CreateProjectUseCase,
  UpdateProjectUseCase,
  DeleteProjectUseCase,
} from '@/use-cases/project';
import { ProjectController } from '@/controllers';

export class ProjectControllerFactory {
  static makeProjectController(projectRepository: ProjectRepository) {
    return new ProjectController(
      new GetProjectUseCase(projectRepository),
      new GetAllProjectsUseCase(projectRepository),
      new CreateProjectUseCase(projectRepository),
      new UpdateProjectUseCase(projectRepository),
      new DeleteProjectUseCase(projectRepository)
    );
  }
}
