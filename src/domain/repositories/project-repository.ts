import { Project } from "../entities/project";
import { ProjectDataSource } from "../../data/interfaces/data-sources/project-data-source";
import { ProjectRepository } from "../interfaces/repositories/project-repository";

export class ProjectRepositoryImpl implements ProjectRepository {
  private projectDataSource: ProjectDataSource;

  constructor(projectDataSource: ProjectDataSource) {
    this.projectDataSource = projectDataSource;
  }
  async getProject(id: string): Promise<Project> {
    const project = await this.projectDataSource.get(id);
    return project;
  }
  async getAllProjects(): Promise<Project[]> {
    const projects = await this.projectDataSource.getAll();
    return projects;
  }
  async createProject(project: Project): Promise<void> {
    await this.projectDataSource.create(project);
  }
  async updateProject(id: string, project: Project): Promise<void> {
    await this.projectDataSource.update(id, project);
  }
  async deleteProject(id: string): Promise<void> {
    await this.projectDataSource.delete(id);
  }
}
