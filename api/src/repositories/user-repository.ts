
import { ServerError } from '@/utils/errors';
import User, { IUser, IUserProject, UserRole } from '@/models/User';
import Project from '@/models/Project';

export namespace UserRepository {
  export interface CreateUserParams {
    name: string;
    email: string;
    password: string;
  }

  export interface AddUserToProjectParams {
    role: UserRole;
    projectId: String;
    userId: String;
  }

  export interface UpdateUserParams {
    name: string;
    password: string;
  }
}

export class UserRepository {

  async addUserToProject(data: UserRepository.AddUserToProjectParams): Promise<IUserProject> {
    try {
      const user = await User.findById(data.userId);
      const project = await Project.findById(data.projectId);

      if (!user || !project) {
        throw new ServerError('User or Project not found');
      }

      const userProject: IUserProject = {
        user: user,
        project: project,
        role: data.role,
      };

      user.projects.push({
        ...userProject,
        project: project.id,
        user: user.id
      });
  
      project.users.push({
        ...userProject,
        project: project.id,
        user: user.id
      });

      await project.save();
      await user.save();

      return {
        ...userProject,
        project: project.toJSON(),
        user: user.toJSON()
      };
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async getUser(query: any): Promise<null | IUser> {
    try {
      const user = await User.findOne(query)
        .select('id name email projects password')

      return user?.toJSON();
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async getUserById(id: String): Promise<null | IUser> {    
    try {
      const user = await User.findOne({_id: id})
        .select('name email projects password')
      
      return user?.toJSON();
    } catch (error: any) {
      console.log(error);
      
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

  async updateUser(id: String, data: UserRepository.UpdateUserParams): Promise<IUser> {
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