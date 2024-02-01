import { CreateProjectRequestDTO } from "../../../domain/dto/create-project-request-dto";
import { UpdateProjectRequestDTO } from "../../../domain/dto/update-project-request-dto";
import { ProjectRepository } from "../../../interfaces/repositories/project-repository";
import { Project } from "./entity/Project";
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
    } catch (error) {
      throw new Error("Error on creating project");
    }
  }
  async updateProject(id: string, data: UpdateProjectRequestDTO): Promise<void> {
    try {
      await this.dataSource.manager.update(Project, { id }, data);
    } catch (error) {
      throw new Error("Error on updating project");
    }
  }
  async deleteProject(id: string): Promise<void> {
    try {
      await this.dataSource.manager.delete(Project, id);
    } catch (error) {
      throw new Error("Error on deleting project");
    }
  }
}
