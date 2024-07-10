import { User } from '@/infra/db/models/User'
import { DataSource } from 'typeorm';
import { ServerError } from '@/util/errors';
import { IUserProject, UserRole } from '@/entities';
import { Project, UserProject } from '../models';

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
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async addUserToProject(data: UserRepository.AddUserToProjectParams): Promise<IUserProject> {
    try {
      const [user] = await this.dataSource.manager.find(User, {
        where: {
          id: data.userId
        }
      })
      const [project] = await this.dataSource.manager.find(Project, {
        where: {
          id: data.projectId
        }
      })
      const userProject = new UserProject();
      userProject.user = user;
      userProject.project = project;
      userProject.role = data.role;
      await this.dataSource.manager.save(UserProject, userProject);
      return userProject;
    } catch (error: any) {
      throw new ServerError(error?.message);
    }
  }

  async getUser(query: any): Promise<null | User> {
    try {
      const [user] = await this.dataSource.manager.find(User, {
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
      await this.dataSource.manager.save(User, { ...user, validated: false });
      return user;
    } catch (error: any) {
      throw new ServerError(error?.message);
    }
  }
  async deleteUser(id: string): Promise<void> {
    try {
      await this.dataSource.manager.softDelete(User, id);
    } catch (error: any) {
      throw new ServerError(error?.message);
    }
  }
}
