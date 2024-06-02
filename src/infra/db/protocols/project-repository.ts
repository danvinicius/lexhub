import { IProject } from '@/entities/project';
import { IUser } from '@/entities';

export namespace ProjectRepository {
  export interface CreateProjectParams {
    name: string;
    description: string;
    user: IUser;
  }
  export interface UpdateProjectParams {
    name: string;
    description: string;
  }
}

export interface ProjectRepository {
  getProject(id: number | string): Promise<null | IProject>;
  getAllProjects(userId: number | string): Promise<IProject[]>;
  createProject(
    project: ProjectRepository.CreateProjectParams
  ): Promise<IProject>;
  updateProject(
    id: number | string,
    project: ProjectRepository.UpdateProjectParams
  ): Promise<void>;
  deleteProject(id: number | string): Promise<void>;
}
