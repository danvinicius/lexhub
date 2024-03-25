import { IProject } from "@/domain/entities";
import { ProjectRepository } from "@/data/protocols/db";
import { GetProject } from "@/domain/use-cases/project";

export class DbGetProject implements GetProject {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }
  async execute(id: number | string): Promise<null | IProject> {
    const project = this.projectRepository.getProject(id);
    return project;
  }
}
