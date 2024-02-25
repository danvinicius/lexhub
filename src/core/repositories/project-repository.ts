import { CreateProjectRequestDTO } from "../../application/http/dtos/create-project-request-dto";
import { UpdateProjectRequestDTO } from "../../application/http/dtos/update-project-request-dto";
import { IProject } from "../domain/entities/project";

export interface ProjectRepository {
  getProject(id: number | string): Promise<null | IProject>;
  getAllProjects(): Promise<IProject[]>;
  createProject(project: CreateProjectRequestDTO): Promise<IProject>;
  updateProject(id: number | string, project: UpdateProjectRequestDTO): Promise<void>;
  deleteProject(id: number | string): Promise<void>;
}
