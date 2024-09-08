import {
  CreateProjectRequestDTO,
  UpdateProjectRequestDTO,
} from '@/infra/http/dtos';
import { IProject } from '@/models';
import { ProjectRepository, UserRepository } from '@/repositories';
import { NotFoundError } from '@/utils/errors';
import { ILexiconScenario, ScenarioService } from './scenario-service';

// Definindo um novo tipo de projeto onde os cenários têm o tipo ILexiconScenario
export interface IProjectWithLexiconScenarios extends Omit<IProject, 'scenarios'> {
  scenarios: ILexiconScenario[];
}

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

  async getProject(id: number): Promise<null | IProjectWithLexiconScenarios> {
    const project = await projectRepository.getProject(id);
    
    if (!project) {
      throw new NotFoundError('This project does not exist');
    }

    const scenarioService = new ScenarioService();

    const scenarios = await Promise.all(
      project.scenarios.map(async (scenario) => {
        return await scenarioService.getScenarioWithLexicon(scenario.id);
      })
    );

    return {
      ...project,
      scenarios,
    };
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
