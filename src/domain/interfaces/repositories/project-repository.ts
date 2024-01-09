import { Project } from "../../entities/project";

export interface ProjectRepository {
  getProject(id: string): Promise<Project>;
  getAllProjects(): Promise<Project[]>;
  createProject(project: Project): Promise<void>;
  updateProject(id: string, project: Project): Promise<void>;
  deleteProject(id: string): Promise<void>;
}
