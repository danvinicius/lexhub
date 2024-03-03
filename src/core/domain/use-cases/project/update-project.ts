import { ProjectRepository } from "../../../repositories/project-repository";
import { UpdateProjectUseCase, UpdateProjectUseCaseParams } from "./interfaces";

export class UpdateProject implements UpdateProjectUseCase {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }
  async execute({ id, project }: UpdateProjectUseCaseParams): Promise<void> {
    await this.projectRepository.updateProject(id, project);
  }
}
