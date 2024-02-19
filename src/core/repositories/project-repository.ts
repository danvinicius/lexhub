import { CreateProjectRequestDTO } from "../../application/dtos/create-project-request-dto";
import { UpdateProjectRequestDTO } from "../../application/dtos/update-project-request-dto";
import { IProject } from "../domain/entities/project";

export interface ProjectRepository {
  getProject(id: string | number): Promise<null | IProject>;
  getAllProjects(): Promise<IProject[]>;
  createProject(project: CreateProjectRequestDTO): Promise<IProject>;
  updateProject(id: string | number, project: UpdateProjectRequestDTO): Promise<void>;
  deleteProject(id: string | number): Promise<void>;
}
