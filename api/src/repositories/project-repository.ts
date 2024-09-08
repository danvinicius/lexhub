
import { ServerError } from '@/utils/errors';
import { IProject, IUser, IUserProject, Project, UserProject, UserRole } from '../models';
import dataSource, { initializeDataSource } from '@/infra/db/connection';

export namespace ProjectRepository {
  export interface CreateProjectParams {
    name: string;
    description: string;
    user: IUser;
  }
  export interface UpdateProjectParams {
    name: string;
    description: string;
  }
}

export class ProjectRepository {

  constructor() {
    initializeDataSource();
  }

  async getProject(id: number): Promise<null | Project> {
    try {
      const [project] = await dataSource.manager.find(Project, {
        where: {
          id,
        },
        relations: {
          symbols: {
            impacts: true,
            synonyms: true,
          },
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
      const projects = await dataSource.manager.find(Project, {
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
      await dataSource.manager.save(UserProject, user);
      await dataSource.manager.save(Project, project);
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
    id: number,
    data: ProjectRepository.UpdateProjectParams
  ): Promise<void> {
    try {
      await dataSource.manager.update(Project, { id }, data);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
  async deleteProject(id: number): Promise<void> {
    try {
      await dataSource.manager.softDelete(Project, id);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
}
