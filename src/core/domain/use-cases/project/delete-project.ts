import { ProjectRepository } from "../../../repositories/project-repository";
import { DeleteProjectUseCase } from "./interfaces/delete-project";

export class DeleteProject implements DeleteProjectUseCase {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(id: string): Promise<void> {
    await this.projectRepository.deleteProject(id);
  }
}
