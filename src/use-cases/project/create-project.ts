import { CreateProjectRequestDTO } from '@/infra/http/dtos';
import { ProjectRepository } from '@/infra/db/protocols';
import { IProject } from '@/entities';

export class CreateProjectUseCase {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(project: CreateProjectRequestDTO): Promise<IProject> {
    return await this.projectRepository.createProject(project);
  }
}
