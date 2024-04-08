import {
  CreateProjectRequestDTO,
  UpdateProjectRequestDTO,
} from '@/infra/http/dtos';
import { IProject } from '@/entities/project';

export interface ProjectRepository {
  getProject(id: number | string): Promise<null | IProject>;
  getAllProjects(): Promise<IProject[]>;
  createProject(project: CreateProjectRequestDTO): Promise<IProject>;
  updateProject(
    id: number | string,
    project: UpdateProjectRequestDTO
  ): Promise<void>;
  deleteProject(id: number | string): Promise<void>;
}
