import { ProjectRepository } from "../../../repositories/project-repository";
import { DeleteProjectUseCase } from "./interfaces";

export class DeleteProject implements DeleteProjectUseCase {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(id: string): Promise<void> {
    await this.projectRepository.deleteProject(id);
  }
}
