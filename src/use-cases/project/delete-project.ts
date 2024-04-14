import { ProjectRepository } from '@/infra/db/protocols';
import { InvalidParamError } from '@/util/errors';

export class DeleteProjectUseCase {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(id: string): Promise<void> {
    const projectExists = await this.projectRepository.getProject(id);
    if (!projectExists) {
      throw new InvalidParamError('projectId');
    }
    await this.projectRepository.deleteProject(id);
  }
}
