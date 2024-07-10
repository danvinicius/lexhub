import { IProject } from '@/entities';
import { ProjectRepository } from '@/infra/db/repositories';

export class GetAllProjectsUseCase {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(userId: number): Promise<IProject[]> {
    const projects = await this.projectRepository.getAllProjects(userId);
    return projects;
  }
}
