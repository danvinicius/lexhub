
import { ServerError } from '@/utils/errors';
import { IUserProject, Project, User, UserProject, UserRole } from '../models';
import dataSource, { initializeDataSource } from '@/infra/db/connection';

export namespace UserRepository {
  export interface CreateUserParams {
    name: string;
    email: string;
    password: string;
  }

  export interface AddUserToProjectParams {
    role: UserRole;
    projectId: number;
    userId: number;
  }
}

export class UserRepository {

  constructor() {
    initializeDataSource();
  }

  async addUserToProject(data: UserRepository.AddUserToProjectParams): Promise<IUserProject> {
    try {
      const [user] = await dataSource.manager.find(User, {
        where: {
          id: data.userId
        }
      })
      const [project] = await dataSource.manager.find(Project, {
        where: {
          id: data.projectId
        }
      })
      const userProject = new UserProject();
      userProject.user = user;
      userProject.project = project;
      userProject.role = data.role;
      await dataSource.manager.save(UserProject, userProject);
      return userProject;
    } catch (error: any) {
      throw new ServerError(error?.message);
    }
  }

  async getUser(query: any): Promise<null | User> {
    try {
      const [user] = await dataSource.manager.find(User, {
        where: query,
        select: {
          id: true,
          name: true,
          email: true,
          projects: true,
          password: true,
        },
        relations: {
          projects: {
            project: true
          },
        },
      });
      delete user?.deletedAt;
      return user;
    } catch (error: any) {
      throw new ServerError(error?.message);
    }
  }
  async createUser(data: UserRepository.CreateUserParams): Promise<User> {
    try {
      const user = new User();
      user.name = data.name;
      user.email = data.email;
      user.password = data.password;
      await dataSource.manager.save(User, { ...user, validated: false });
      return user;
    } catch (error: any) {
      throw new ServerError(error?.message);
    }
  }
  async deleteUser(id: string): Promise<void> {
    try {
      await dataSource.manager.softDelete(User, id);
    } catch (error: any) {
      throw new ServerError(error?.message);
    }
  }
}
