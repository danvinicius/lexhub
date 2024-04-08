import { IProject } from '@/entities';
import { ProjectRepository } from '@/protocols/db';
import { NotFoundError } from '@/util/errors';

export class GetProjectUseCase {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }
  async execute(id: number | string): Promise<null | IProject> {
    const project = await this.projectRepository.getProject(id);
    if (!project) {
      throw new NotFoundError('This project does not exist');
    }
    return project;
  }
}
