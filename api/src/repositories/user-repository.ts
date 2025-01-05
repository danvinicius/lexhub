
import { ServerError } from '@/utils/errors';
import User, { IUser, IUserProject, IUserRole } from '@/models/User';
import Project from '@/models/Project';

export namespace UserRepository {
  export interface CreateUserParams {
    name: string;
    email: string;
    password: string;
  }

  export interface AddUserToProjectParams {
    role: IUserRole;
    projectId: String;
    userId: String;
  }

  export interface ChangeUserRoleParams {
    userId: string;
    projectId: string;
    newRole: IUserRole;
  }

  export interface UpdateUserParams {
    name: string;
    password: string;
  }

  export interface RemoveUserFromProjectParams {
    userId: string;
    projectId: string;
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

  async changeUserRole(data: UserRepository.ChangeUserRoleParams): Promise<IUserProject> {
    try {
      const user = await User.findById(data.userId);
      const project = await Project.findById(data.projectId);
  
      if (!user || !project) {
        throw new ServerError('User or Project not found');
      }
  
      // Verificar se o usuário já faz parte do projeto
      const userProjectInUser = user.projects.find(
        (up: any) => up.project.toString() === data.projectId
      );
  
      const userProjectInProject = project.users.find(
        (pu: any) => pu.user.toString() === data.userId
      );
  
      if (!userProjectInUser || !userProjectInProject) {
        throw new ServerError('User is not part of the project');
      }
  
      // Atualizar o cargo do usuário no projeto
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

  async removeUserFromProject(data: UserRepository.RemoveUserFromProjectParams): Promise<void> {
    try {
      const user = await User.findById(data.userId);
      const project = await Project.findById(data.projectId);
  
      if (!user || !project) {
        throw new ServerError('User or Project not found');
      }
  
      // Remover o usuário da lista de projetos do usuário
      user.projects = user.projects.filter(
        (up: any) => up.project.toString() !== data.projectId
      );
  
      // Remover o usuário da lista de usuários do projeto
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