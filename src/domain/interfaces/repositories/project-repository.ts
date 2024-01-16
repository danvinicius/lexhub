import { Project } from "../../entities/project";

export interface ProjectRepository {
  getProject(id: string): Promise<null | Project>;
  getAllProjects(): Promise<Project[]>;
  createProject(project: Project): Promise<string | number>;
  updateProject(id: string, project: Project): Promise<void>;
  deleteProject(id: string): Promise<void>;
}
