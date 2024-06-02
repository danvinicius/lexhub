import { ProjectRepository } from '@/infra/db/protocols';
import { Project } from '@/infra/db/models/Project';
import { DataSource } from 'typeorm';
import { ServerError } from '@/util/errors';
import { UserProject } from '../models';
import { IProject, IUserProject, UserRole } from '@/entities';

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
          users: {
            user: true
          }
        },
      });
      delete project?.deletedAt;
      project?.users.map((user: IUserProject) => {
        delete user.user.password;
        delete user.user.projects;
      })
      return project;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
  async getAllProjects(userId: number): Promise<Project[]> {
    try {
      const projects = await this.dataSource.manager.find(Project, {
        where: {
          users: {
            user: {
              id: userId
            }
          }
        },
        relations: {
          symbols: true,
          scenarios: true,
          users: {
            user: true
          }
        },
      });
      projects?.map((project: IProject) => {
        project.users.map((user: IUserProject) => {
          delete user.user.password;
          delete user.user.projects;
        })
      })
      return projects;
    } catch (error: any) {
      throw new ServerError(error?.message);
    }
  }

  // todo: create response dtos
  async createProject(
    data: ProjectRepository.CreateProjectParams
  ): Promise<Project> {
    try {
      const project = new Project();
      project.name = data.name;
      project.description = data.description;
      const user = new UserProject()
      delete data.user.password;
      user.user = data.user;
      user.role = UserRole.OWNER;
      project.users = [user]
      await this.dataSource.manager.save(UserProject, user);
      await this.dataSource.manager.save(Project, project);
      project.users.map((user: IUserProject) => {
        delete user.user.password;
        delete user.user.projects;
      })
      return project;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
  async updateProject(
    id: string,
    data: ProjectRepository.UpdateProjectParams
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
