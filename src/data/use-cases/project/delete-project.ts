import { ProjectRepository } from "@/data/protocols/db";
import { DeleteProject } from "@/domain/use-cases";

export class DbDeleteProject implements DeleteProject {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(id: string): Promise<void> {
    await this.projectRepository.deleteProject(id);
  }
}
