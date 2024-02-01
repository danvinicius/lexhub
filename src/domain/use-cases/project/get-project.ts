import { IProject } from "../../entities/project";
import { ProjectRepository } from "../../../interfaces/repositories/project-repository";
import { GetProjectUseCase } from "../../../interfaces/use-cases/project/get-project";

export class GetProject implements GetProjectUseCase {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }
  async execute(id: string | number): Promise<null | IProject> {
    const project = this.projectRepository.getProject(id);
    return project;
  }
}
