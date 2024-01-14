import { ProjectRepository } from "../../interfaces/repositories/project-repository";
import { DeleteProjectUseCase } from "../../interfaces/use-cases/project/delete-project";

export class DeleteProject implements DeleteProjectUseCase {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(id: string): Promise<void> {
    try {
      const projectExists = await this.projectRepository.getProject(id);
      if (!projectExists) {
        throw new Error("Projeto não encontrado");
      }
      await this.projectRepository.deleteProject(id);
    } catch (error) {
      console.log(error);
      throw new Error("Houve um erro ao deletar o projeto");
    }
  }
}
