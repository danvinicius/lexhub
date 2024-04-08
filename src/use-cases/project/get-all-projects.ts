import { IProject } from '@/entities';
import { ProjectRepository } from '@/protocols/db';

export class GetAllProjectsUseCase {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(): Promise<IProject[]> {
    const projects = await this.projectRepository.getAllProjects();
    return projects;
  }
}
