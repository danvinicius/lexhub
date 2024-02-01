import { CreateProjectRequestDTO } from "../../domain/dto/create-project-request-dto"
import { UpdateProjectRequestDTO } from "../../domain/dto/update-project-request-dto";
import { IProject } from "../../domain/entities/project";

export interface ProjectRepository {
  getProject(id: string | number): Promise<null | IProject>;
  getAllProjects(): Promise<IProject[]>;
  createProject(project: CreateProjectRequestDTO): Promise<IProject>;
  updateProject(id: string | number, project: UpdateProjectRequestDTO): Promise<void>;
  deleteProject(id: string | number): Promise<void>;
}
