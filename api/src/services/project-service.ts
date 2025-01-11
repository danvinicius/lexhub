import {
  CreateProjectRequestDTO,
  UpdateProjectRequestDTO,
} from '@/infra/http/dtos';
import { IProject } from '@/models';
import { ProjectRepository, UserRepository } from '@/repositories';
import { NotFoundError } from '@/utils/errors';
import { ILexiconScenario, ScenarioService } from './scenario-service';
import { ILexiconSymbol, SymbolService } from './symbol-service';
import { ChangeService } from './change-service';

export interface IProjectWithLexicon
  extends Omit<Omit<IProject, 'scenarios'>, 'symbols'> {
  scenarios: (ILexiconScenario | null)[];
  symbols: (ILexiconSymbol | null)[];
}

export class ProjectService {
  constructor(
    private projectRepository = new ProjectRepository(),
    private userRepository = new UserRepository(),
    private changeService = new ChangeService(),
  ) {}

  async createProject(
    project: CreateProjectRequestDTO,
    userId: String
  ): Promise<IProject | void> {
    const user = await this.userRepository.getUserById(userId);
    if (user) {  
      return await this.projectRepository.createProject({ ...project, user });
    }
  }

  async getProject(id: String): Promise<null | IProjectWithLexicon> {
    const project = await this.projectRepository.getProject(id);

    if (!project) {
      throw new NotFoundError('Este projeto não existe');
    }

    const scenarioService = new ScenarioService();
    const symbolService = new SymbolService();

    const scenarios = project?.scenarios ? await Promise.all(
      project.scenarios.map(async (scenario) => {
          return await scenarioService.getScenarioWithLexicon(
            scenario.id || '',
            project.id || ''
          );
      })
    ) : [];

    const symbols = project.symbols ? await Promise.all(
      project.symbols.map(async (symbol) => {
        return await symbolService.getSymbolWithLexicon(symbol.id || '', project.id || '');
      })
    ) : [];

    return {
      ...project,
      scenarios,
      symbols,
    };
  }

  async isProjectPrivate(projectId: String): Promise<boolean> {
    const project = await this.projectRepository.getProject(projectId);
    if (project) {
      return project.private;
    }
    return false;
  }

  async getCleanProject(id: String, excludeDeleted = true): Promise<null | IProject> {
    const project = await this.projectRepository.getProject(id, excludeDeleted);

    if (!project) {
      throw new NotFoundError('Este projeto não existe');
    }

    return project;
  }

  async getAllProjects(userId: String, excludeDeleted = true): Promise<IProject[]> {
    const projects = await this.projectRepository.getAllProjects(userId, excludeDeleted);
    return projects;
  }

  async updateProject(
    id: String,
    project: UpdateProjectRequestDTO,
    userId: String
  ): Promise<IProject | void> {
    const beforeChange = await this.getCleanProject(id);
    await this.projectRepository.updateProject(id, project);
    const afterChange = await this.getCleanProject(id);
    if (beforeChange && afterChange) {
      await this.changeService.createChange(beforeChange, afterChange, id, project.name, userId);
      return afterChange;
    }
  }

  async deleteProject(id: String, userId: String): Promise<void> {
    const beforeChange = await this.getCleanProject(id, false);
    await this.projectRepository.deleteProject(id);
    const afterChange = await this.getCleanProject(id, false);
    if (beforeChange && afterChange) {
      await this.changeService.createChange(beforeChange, afterChange, id, beforeChange.name, userId);
    }
  }
}
