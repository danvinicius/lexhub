import { ServerError } from '@/utils/errors';
import { IUser, IUserProject } from '@/models';
import Project from '@/models/Project';
import User from '@/models/User';
import { Logger } from '@/utils/logger/logger';

export namespace UserRepository {
  export interface CreateUserParams {
    name: string;
    email: string;
    password: string;
  }

  export interface AddUserToProjectParams {
    role: string;
    projectId: String;
    userId: String;
  }

  export interface ChangeUserRoleParams {
    userId: string;
    projectId: string;
    newRole: string;
  }

  export interface UpdateUserParams {
    name?: string;
    password?: string;
    recoveryCode?: string | null
    validated?: boolean;
  }

  export interface RemoveUserFromProjectParams {
    userId: string;
    projectId: string;
  }
}

export class UserRepository {
  async addUserToProject(
    data: UserRepository.AddUserToProjectParams
  ): Promise<IUserProject> {
    try {
      const user = await User.findById(data.userId);
      const project = await Project.findById(data.projectId);

      if (!user || !project) {
        throw new ServerError('Usuário ou projeto não encontrado');
      }

      const userProject: IUserProject = {
        user: user,
        project: project,
        role: data.role,
      };

      user.projects?.push({
        ...userProject,
        project: project.id,
        user: user.id,
      });

      project.users.push({
        ...userProject,
        project: project.id,
        user: user.id,
      });

      await project.save();
      await user.save();

      return {
        ...userProject,
        project: project.toJSON(),
        user: user.toJSON(),
      };
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async changeUserRole(
    data: UserRepository.ChangeUserRoleParams
  ): Promise<IUserProject> {
    try {
      const user = await User.findById(data.userId);
      const project = await Project.findById(data.projectId);

      if (!user || !project) {
        throw new ServerError('Usuário ou projeto não encontrado');
      }

      const userProjectInUser = user.projects?.find(
        (up: any) => up.project.toString() === data.projectId
      );

      const userProjectInProject = project.users.find(
        (pu: any) => pu.user.toString() === data.userId
      );

      if (!userProjectInUser || !userProjectInProject) {
        throw new ServerError('O usuário não faz parte deste projeto');
      }

      userProjectInUser.role = data.newRole;
      userProjectInProject.role = data.newRole;

      await project.save();
      await user.save();

      return {
        user: user.toJSON(),
        project: project.toJSON(),
        role: data.newRole,
      };
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async removeUserFromProject(
    data: UserRepository.RemoveUserFromProjectParams
  ): Promise<void> {
    try {
      const user = await User.findById(data.userId);
      const project = await Project.findById(data.projectId);

      if (!user || !project) {
        throw new ServerError('Usuário ou projeto não encontrado');
      }

      user.projects = user.projects?.filter(
        (up: any) => up.project.toString() !== data.projectId
      );

      project.users = project.users.filter(
        (pu: any) => pu.user.toString() !== data.userId
      );

      await user.save();
      await project.save();
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async getUser(query: any): Promise<null | IUser> {
    try {
      const user = await User.findOne(query).select(
        'id name email recoveryCode validated projects password'
      );
      if (user) {
        return user.toJSON();
      }
      return null;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async getUserById(id: String): Promise<null | IUser> {
    try {
      const user = await User.findOne({ _id: id }).select(
        'name email projects password'
      );

      if (user) {
        return user.toJSON();
      }

      return null;

    } catch (error: any) {
      Logger.error(error);
      throw new ServerError(error.message);
    }
  }

  async createUser(data: UserRepository.CreateUserParams): Promise<IUser> {
    try {
      const newUser = new User({
        name: data.name,
        email: data.email,
        password: data.password,
        validated: false,
      });

      await newUser.save();
      return newUser.toJSON();
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async updateUser(
    id: String,
    data: UserRepository.UpdateUserParams
  ): Promise<IUser | null> {
    try {
      await User.findByIdAndUpdate(id, data);
      return await this.getUserById(id);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async deleteUser(id: String): Promise<void> {
    try {
      await User.findByIdAndDelete(id);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
}
