import { Project } from "../../entities/project";
import { ProjectRepository } from "../../interfaces/repositories/project-repository";
import { UpdateProjectUseCase } from "../../interfaces/use-cases/project/update-project";

export class UpdateProject implements UpdateProjectUseCase {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }
  async execute(id: string, project: Project): Promise<void> {
    try {
      const projectExists = await this.projectRepository.getProject(id);
      if (!projectExists) {
        throw new Error("Projeto não encontrado");
      }
      await this.projectRepository.updateProject(id, project);
    } catch (error) {
      console.log(error);
      throw new Error("Houve um erro ao atualizar o projeto");
    }
  }
}
