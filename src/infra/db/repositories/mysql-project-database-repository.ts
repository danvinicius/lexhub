import {
  CreateProjectRequestDTO,
  UpdateProjectRequestDTO,
} from "@/infra/http/dtos";
import { ProjectRepository } from "@/protocols/db";
import { Project } from "@/infra/db/typeorm/entity/Project";
import { DataSource } from "typeorm";
import { ServerError } from "@/util/errors";

export class MySQLProjectRepository implements ProjectRepository {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async getProject(id: number): Promise<null | Project> {
    try {
      const [project] = await this.dataSource.manager.find(Project, {
        where: {
          id,
        },
        relations: {
          symbols: true,
          scenarios: true,
        },
      });
      delete project?.deletedAt;
      return project;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
  async getAllProjects(): Promise<Project[]> {
    try {
      const projects = await this.dataSource.manager.find(Project, {
        relations: {
          symbols: true,
          scenarios: true,
        },
      });
      return projects;
    } catch (error: any) {
      throw new ServerError(error?.message);
    }
  }
  async createProject(data: CreateProjectRequestDTO): Promise<Project> {
    try {
      const project = new Project();
      project.name = data.name;
      project.description = data.description;
      await this.dataSource.manager.save(Project, project);
      return project;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
  async updateProject(
    id: string,
    data: UpdateProjectRequestDTO
  ): Promise<void> {
    try {
      await this.dataSource.manager.update(Project, { id }, data);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
  async deleteProject(id: string): Promise<void> {
    try {
      await this.dataSource.manager.softDelete(Project, id);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
}
