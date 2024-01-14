import { Project } from "../../../domain/entities/project";

export interface ProjectDatabaseWrapper {
  findById(id: string | number): Promise<Project>;
  findAll(): Promise<Project[]>;
  insert(data: any): Promise<boolean>;
  updateById(id: string | number, data: Project): Promise<boolean>;
  deleteById(id: string | number): Promise<boolean>;
}
