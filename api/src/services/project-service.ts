import {
  CreateProjectRequestDTO,
  UpdateProjectRequestDTO,
} from '@/infra/http/dtos';
import { IProject } from '@/models';
import { ProjectRepository, UserRepository } from '@/repositories';
import { NotFoundError } from '@/utils/errors';

const projectRepository = new ProjectRepository();
const userRepository = new UserRepository();

export class ProjectService {
  async createProject(
    project: CreateProjectRequestDTO,
    userId: number
  ): Promise<IProject> {
    const user = await userRepository.getUser({ id: userId });
    return await projectRepository.createProject({ ...project, user });
  }

  async getProject(id: number): Promise<null | IProject> {
    const project = await projectRepository.getProject(id);
    if (!project) {
      throw new NotFoundError('This project does not exist');
    }
    return project;
  }

  async getAllProjects(userId: number): Promise<IProject[]> {
    const projects = await projectRepository.getAllProjects(userId);
    return projects;
  }

  async updateProject(
    id: number,
    project: UpdateProjectRequestDTO
  ): Promise<void> {
    await projectRepository.updateProject(id, project);
  }

  async deleteProject(id: number): Promise<void> {
    await projectRepository.deleteProject(id);
  }
}
