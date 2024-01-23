import { Project } from "../../entities/project";

export interface ProjectRepository {
  getProject(id: string | number): Promise<null | Project>;
  getAllProjects(): Promise<Project[]>;
  createProject(project: Project): Promise<string | number>;
  updateProject(id: string | number, project: Project): Promise<void>;
  deleteProject(id: string | number): Promise<void>;
}
