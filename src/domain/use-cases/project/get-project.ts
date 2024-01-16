import { Project } from "../../entities/project";
import { ProjectRepository } from "../../interfaces/repositories/project-repository";
import { GetProjectUseCase } from "../../interfaces/use-cases/project/get-project";

export class GetProject implements GetProjectUseCase {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }
  async execute(id: string): Promise<null | Project> {
    const project = this.projectRepository.getProject(id);
    return project;
  }
}
