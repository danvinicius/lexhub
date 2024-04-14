import { ProjectRepository } from '@/infra/db/protocols';
import { UpdateProjectRequestDTO } from '@/infra/http/dtos';
import { InvalidParamError } from '@/util/errors';

export namespace UpdateProjectUseCase {
  export interface Params {
    id: number | string;
    project: UpdateProjectRequestDTO;
  }
}

export class UpdateProjectUseCase {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }
  async execute({ id, project }: UpdateProjectUseCase.Params): Promise<void> {
    const projectExists = await this.projectRepository.getProject(id);
    if (!projectExists) {
      throw new InvalidParamError('projectId');
    }
    await this.projectRepository.updateProject(id, project);
  }
}
