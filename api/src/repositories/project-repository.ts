import { ServerError } from '@/utils/errors';
import Project, { IProject } from '@/models/Project';
import { IUser, UserRole } from '@/models';
import User from '@/models/User';

export namespace ProjectRepository {
  export interface CreateProjectParams {
    name: string;
    description: string;
    private: boolean;
    user: IUser;
  }
  export interface UpdateProjectParams {
    name: string;
    description: string;
    private: boolean;
  }
}

export class ProjectRepository {
  async getProject(id: string): Promise<null | IProject> {
    try {
      const project = await Project.findById(id)
        .populate('symbols')
        .populate('scenarios')
        .populate({
          path: 'users.user',
          select: '-password',
        });

      if (!project) return null;
      return project?.toJSON();
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async getAllProjects(userId: string): Promise<IProject[]> {
    try {
      const projects = await Project.find({
        'users.user': userId,
      })
        .populate('symbols')
        .populate('scenarios')
        .populate({
          path: 'users.user',
          select: '-password',
        });
        
      return projects.map(project => project.toJSON());
    } catch (error: any) {
      throw new ServerError(error?.message);
    }
  }

  async createProject(
    data: ProjectRepository.CreateProjectParams
  ): Promise<IProject> {
    
    try {
      const project = new Project({
        name: data.name,
        description: data.description,
        private: data.private,
        users: [{ user: data.user.id, role: UserRole.OWNER }],
      });

      await project.save();

      await User.findByIdAndUpdate(
        data.user.id,
        {
          $push: {
            projects: {
              project: project._id,
              role: UserRole.OWNER,
            },
          },
        },
        { new: true }
      );

      return project.toJSON();
    } catch (error: any) {
      console.log(error);
      
      throw new ServerError(error.message);
    }
  }

  async updateProject(
    id: string,
    data: ProjectRepository.UpdateProjectParams
  ): Promise<IProject> {
    try {
      await Project.updateOne({ _id: id }, { $set: data });
      return await this.getProject(id);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async deleteProject(id: string): Promise<void> {
    try {
      await Project.deleteOne({ _id: id });
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
}
