import { Project } from "../entities/project";
import { ProjectDatabaseWrapper } from "../../data/interfaces/wrapper/project-database-wrapper";
import { ProjectRepository } from "../interfaces/repositories/project-repository";

export class ProjectRepositoryImpl implements ProjectRepository {
  private projectDbWrapper: ProjectDatabaseWrapper;

  constructor(projectDbWrapper: ProjectDatabaseWrapper) {
    this.projectDbWrapper = projectDbWrapper;
  }
  async getProject(id: string): Promise<null | Project> {
    try {
      const project = await this.projectDbWrapper.findById(id);
      return project;
    } catch (error) {
      throw new Error('Projeto não encontrado')
    }
  }
  async getAllProjects(): Promise<Project[]> {
    const projects = await this.projectDbWrapper.findAll();
    return projects;
  }
  async createProject(project: Project): Promise<void> {
    await this.projectDbWrapper.insert(project);
  }
  async updateProject(id: string, project: Project): Promise<void> {
    await this.projectDbWrapper.updateById(id, project);
  }
  async deleteProject(id: string): Promise<void> {
    await this.projectDbWrapper.deleteById(id);
  }
}
