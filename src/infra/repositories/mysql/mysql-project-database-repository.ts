import { CreateProjectRequestDTO } from "../../../application/http/dtos/create-project-request-dto";
import { UpdateProjectRequestDTO } from "../../../application/http/dtos/update-project-request-dto";
import { ProjectRepository } from "../../../core/repositories/project-repository";
import { Project } from '../../database/mysql/typeorm/entity/Project'
import { DataSource } from "typeorm";

export class MySQLProjectRepository implements ProjectRepository {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async getProject(id: number): Promise<null | Project> {
    const [project] = await this.dataSource.manager.find(Project, {
      where: {
        id,
      },
      relations: {
        symbols: true,
        scenarios: true,
      },
    });
    if (!project) {
      throw new Error("Project not found");
    }
    return project;
  }
  async getAllProjects(): Promise<Project[]> {
    const projects = await this.dataSource.manager.find(Project, {
      relations: {
        symbols: true,
        scenarios: true,
      },
    });
    return projects;
  }
  async createProject(data: CreateProjectRequestDTO): Promise<Project> {
    try {
      const project = new Project()
      project.name = data.name;
      project.description = data.description;
      await this.dataSource.manager.save(Project, project);
      return project;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async updateProject(id: string, data: UpdateProjectRequestDTO): Promise<void> {
    try {
      await this.dataSource.manager.update(Project, { id }, data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async deleteProject(id: string): Promise<void> {
    try {
      await this.dataSource.manager.softDelete(Project, id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
