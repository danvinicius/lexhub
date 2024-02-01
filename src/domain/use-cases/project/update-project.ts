import { IProject } from "../../entities/project";
import { ProjectRepository } from "../../../interfaces/repositories/project-repository";
import { UpdateProjectUseCase } from "../../../interfaces/use-cases/project/update-project";

export class UpdateProject implements UpdateProjectUseCase {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }
  async execute(id: string, project: IProject): Promise<void> {
    await this.projectRepository.updateProject(id, project);
  }
}
