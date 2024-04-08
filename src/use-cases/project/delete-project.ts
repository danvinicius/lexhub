import { ProjectRepository } from "@/protocols/db";

export class DeleteProjectUseCase {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(id: string): Promise<void> {
    await this.projectRepository.deleteProject(id);
  }
}
