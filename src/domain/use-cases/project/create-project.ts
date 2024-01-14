import { Project } from "../../entities/project";
import { ProjectRepository } from "../../interfaces/repositories/project-repository";
import { CreateProjectUseCase } from "../../interfaces/use-cases/project/create-project";

export class CreateProject implements CreateProjectUseCase {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(project: Project): Promise<void> {
    try {
      await this.projectRepository.createProject(project);
    } catch (error) {
      console.log(error);
      throw new Error("Houve um erro ao criar o projeto");
    }
  }
}
