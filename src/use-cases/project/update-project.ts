import { ProjectRepository } from '@/infra/db/repositories';
import { UpdateProjectRequestDTO } from '@/infra/http/dtos';

export namespace UpdateProjectUseCase {
  export interface Params {
    id: number;
    project: UpdateProjectRequestDTO;
  }
}

export class UpdateProjectUseCase {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }
  async execute({ id, project }: UpdateProjectUseCase.Params): Promise<void> {
    await this.projectRepository.updateProject(id, project);
  }
}
