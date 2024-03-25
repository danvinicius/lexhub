import { CreateProjectRequestDTO } from "@/presentation/http/dtos";
import { ProjectRepository } from "@/data/protocols/db";
import { CreateProject } from "@/domain/use-cases/project";
import { IProject } from "@/domain/entities";

export class DbCreateProject implements CreateProject {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(project: CreateProjectRequestDTO): Promise<IProject> {
    return await this.projectRepository.createProject(project);
  }
}
