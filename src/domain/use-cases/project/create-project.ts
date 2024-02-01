import { CreateProjectRequestDTO } from "../../dto/create-project-request-dto";
import { ProjectRepository } from "../../../interfaces/repositories/project-repository";
import { CreateProjectUseCase } from "../../../interfaces/use-cases/project/create-project";
import { IProject } from "../../entities/project";

export class CreateProject implements CreateProjectUseCase {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(project: CreateProjectRequestDTO): Promise<IProject> {
    return await this.projectRepository.createProject(project);
  }
}
