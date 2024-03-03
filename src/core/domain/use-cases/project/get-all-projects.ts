import { IProject } from "../../entities/project";
import { ProjectRepository } from "../../../repositories/project-repository";
import { GetAllProjectsUseCase } from "./interfaces";

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
