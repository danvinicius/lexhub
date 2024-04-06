import { IProject } from "@/domain/entities";
import { ProjectRepository } from "@/data/protocols/db";
import { GetAllProjects } from "@/domain/use-cases";

export class DbGetAllProjects implements GetAllProjects {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(): Promise<IProject[]> {
    const projects = await this.projectRepository.getAllProjects();
    return projects;
  }
}
