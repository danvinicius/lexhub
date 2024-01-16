import { Project } from "../../entities/project";
import { ProjectRepository } from "../../interfaces/repositories/project-repository";
import { CreateProjectUseCase } from "../../interfaces/use-cases/project/create-project";

export class CreateProject implements CreateProjectUseCase {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(project: Project): Promise<string | number> {
    const projectId = await this.projectRepository.createProject(project);
    return projectId;
  }
}
