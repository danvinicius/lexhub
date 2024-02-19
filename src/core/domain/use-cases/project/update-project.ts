import { ProjectRepository } from "../../../repositories/project-repository";
import { UpdateProjectUseCase } from "./interfaces/update-project";
import { UpdateProjectRequestDTO } from "../../../../application/dtos/update-project-request-dto";

export class UpdateProject implements UpdateProjectUseCase {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }
  async execute(id: string, project: UpdateProjectRequestDTO): Promise<void> {
    await this.projectRepository.updateProject(id, project);
  }
}
