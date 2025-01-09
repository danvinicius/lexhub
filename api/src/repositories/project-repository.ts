import { ServerError } from '@/utils/errors';
import Project, { IProject } from '@/models/Project';
import { IUser, IUserRole } from '@/models';
import User from '@/models/User';
import { Logger } from '@/utils/logger/logger';

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
  async getProject(
    id: String,
    excludeDeleted = true
  ): Promise<null | IProject> {
    try {
      const projectFilter: any = { _id: id };
      if (excludeDeleted) {
        projectFilter.deletedAt = null;
      }
      const project = await Project.findOne(projectFilter)
      .populate({ path: 'scenarios' })
        .populate({ path: 'symbols' })
        .populate({
          path: 'users.user',
          select: '-password -projects',
        });
        
      if (!project) return null;
      return project?.toJSON();
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async getAllProjects(
    userId: String,
    excludeDeleted = true
  ): Promise<IProject[]> {
    try {
      const projectFilter: any = { 'users.user': userId };

      if (excludeDeleted) {
        projectFilter.deletedAt = null;
      }
      const projects = await Project.find(projectFilter)
      .populate({ path: 'scenarios' })
        .populate({ path: 'symbols' })
        .populate({
          path: 'users.user',
          select: '-password -projects',
        });

      return projects.map((project) => project.toJSON());
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
        users: [{ user: data.user.id, role: IUserRole.PROPRIETARIO }],
      });

      await project.save();

      await User.findByIdAndUpdate(
        data.user.id,
        {
          $push: {
            projects: {
              project: project._id,
              role: IUserRole.PROPRIETARIO,
            },
          },
        },
        { new: true }
      );

      return project.toJSON();
    } catch (error: any) {
      Logger.error(error);
      throw new ServerError(error.message);
    }
  }

  async updateProject(
    id: String,
    data: ProjectRepository.UpdateProjectParams
  ): Promise<IProject> {
    try {
      await Project.updateOne({ _id: id }, { $set: data });
      return await this.getProject(id);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async deleteProject(id: String): Promise<void> {
    try {
      const project = await Project.findById(id);

      if (!project) {
        throw new ServerError('Projeto não encontrado.');
      }

      project.deletedAt = new Date();
      await project.save();
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
}
