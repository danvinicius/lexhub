import { IProject } from "../../entities/project";
import { ProjectRepository } from "../../../interfaces/repositories/project-repository";
import { GetAllProjectsUseCase } from "../../../interfaces/use-cases/project/get-all-projects";

export class GetAllProjects implements GetAllProjectsUseCase {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(): Promise<IProject[]> {
    const projects = await this.projectRepository.getAllProjects();
    return projects;
  }
}
