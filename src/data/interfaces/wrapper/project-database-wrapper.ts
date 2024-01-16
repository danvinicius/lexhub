import { Project } from "../../../domain/entities/project";

export interface ProjectDatabaseWrapper {
  findById(id: string | number): Promise<null | Project>;
  findAll(): Promise<Project[]>;
  insert(data: any): Promise<string | number>;
  updateById(id: string | number, data: Project): Promise<boolean>;
  deleteById(id: string | number): Promise<boolean>;
}
