import { ProjectRepository } from "@/data/protocols/db";
import { UpdateProject } from "@/domain/use-cases/project";

export class DbUpdateProject implements UpdateProject {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }
  async execute({ id, project }: UpdateProject.Params): Promise<void> {
    await this.projectRepository.updateProject(id, project);
  }
}
