import { Project } from "../../entities/project";

export interface ProjectDataSource {
  get(id: string): Promise<Project>;
  getAll(): Promise<Project[]>;
  create(project: Project): Promise<void>;
  update(id: string, project: Project): Promise<void>;
  delete(id: string): Promise<void>;
}
