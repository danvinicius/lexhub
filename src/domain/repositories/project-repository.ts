import { Project } from "../entities/project";
import { ProjectDatabaseWrapper } from "../../data/interfaces/wrapper/project-database-wrapper";
import { ProjectRepository } from "../interfaces/repositories/project-repository";

export class ProjectRepositoryImpl implements ProjectRepository {
  private projectDbWrapper: ProjectDatabaseWrapper;

  constructor(projectDbWrapper: ProjectDatabaseWrapper) {
    this.projectDbWrapper = projectDbWrapper;
  }
  async getProject(id: string): Promise<null | Project> {
    const project = await this.projectDbWrapper.findById(id);
    return project;
  }
  async getAllProjects(): Promise<Project[]> {
    const projects = await this.projectDbWrapper.findAll();
    return projects;
  }
  async createProject(project: Project): Promise<string | number> {
    const projectId = await this.projectDbWrapper.insert(project);
    return projectId;
  }
  async updateProject(id: string, project: Project): Promise<void> {
    await this.projectDbWrapper.updateById(id, project);
  }
  async deleteProject(id: string): Promise<void> {
    await this.projectDbWrapper.deleteById(id);
  }
}
