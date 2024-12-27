import {
  CreateProjectRequestDTO,
  UpdateProjectRequestDTO,
} from '@/infra/http/dtos';
import { IProject } from '@/models';
import { ProjectRepository, UserRepository } from '@/repositories';
import { NotFoundError } from '@/utils/errors';
import { ILexiconScenario, ScenarioService } from './scenario-service';
import { ILexiconSymbol, SymbolService } from './symbol-service';

// Definindo um novo tipo de projeto onde os cenários têm o tipo ILexiconScenario
export interface IProjectWithLexicon extends Omit<Omit<IProject, 'scenarios'>, 'symbols'> {
  scenarios: ILexiconScenario[];
  symbols: ILexiconSymbol[];
}

const projectRepository = new ProjectRepository();
const userRepository = new UserRepository();

export class ProjectService {
  async createProject(
    project: CreateProjectRequestDTO,
    userId: string
  ): Promise<IProject> {
    const user = await userRepository.getUserById(userId);
    return await projectRepository.createProject({ ...project, user });
  }

  async getProject(id: string): Promise<null | IProjectWithLexicon> {
    const project = await projectRepository.getProject(id);
    
    if (!project) {
      throw new NotFoundError('This project does not exist');
    }

    const scenarioService = new ScenarioService();
    const symbolService = new SymbolService();

    const scenarios = await Promise.all(
      project.scenarios.map(async (scenario) => {
        return await scenarioService.getScenarioWithLexicon(scenario.id, project.id);
      })
    );

    const symbols = await Promise.all(
      project.symbols.map(async (symbol) => {
        return await symbolService.getSymbolWithLexicon(symbol.id, project.id);
      })
    );

    return {
      ...project,
      scenarios,
      symbols,
    };
  }

  async isProjectPrivate(projectId: string): Promise<boolean> {
    const project = await projectRepository.getProject(projectId);
    if (project) {
      return project.private;
    }
    return false;
  }

  async getCleanProject(id: string): Promise<null | IProject> {
    const project = await projectRepository.getProject(id);
    
    if (!project) {
      throw new NotFoundError('This project does not exist');
    }

    return project;
  }

  async getAllProjects(userId: string): Promise<IProject[]> {
    const projects = await projectRepository.getAllProjects(userId);
    return projects;
  }

  async updateProject(
    id: string,
    project: UpdateProjectRequestDTO
  ): Promise<IProject> {
    return await projectRepository.updateProject(id, project);
  }

  async deleteProject(id: string): Promise<void> {
    await projectRepository.deleteProject(id);
  }
}
