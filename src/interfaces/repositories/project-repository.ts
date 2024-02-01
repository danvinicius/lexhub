import { ProjectRequestDTO } from "../../domain/dto/project-request-dto"
import { IProject } from "../../domain/entities/project";

export interface ProjectRepository {
  getProject(id: string | number): Promise<null | IProject>;
  getAllProjects(): Promise<IProject[]>;
  createProject(project: ProjectRequestDTO): Promise<IProject>;
  updateProject(id: string | number, project: IProject): Promise<void>;
  deleteProject(id: string | number): Promise<void>;
}
