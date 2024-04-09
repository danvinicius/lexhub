import { IProject } from '@/entities/project';

export namespace ProjectRepository {
  export interface CreateProjectParams {
    name: string;
    description: string;
  }
  export interface UpdateProjectParams {
    name: string;
    description: string;
  }
}

export interface ProjectRepository {
  getProject(id: number | string): Promise<null | IProject>;
  getAllProjects(): Promise<IProject[]>;
  createProject(
    project: ProjectRepository.CreateProjectParams
  ): Promise<IProject>;
  updateProject(
    id: number | string,
    project: ProjectRepository.UpdateProjectParams
  ): Promise<void>;
  deleteProject(id: number | string): Promise<void>;
}
