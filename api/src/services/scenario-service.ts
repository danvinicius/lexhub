import {
  CreateManyScenariosRequestDTO,
  CreateScenarioRequestDTO,
  UpdateScenarioRequestDTO,
} from '@/infra/http/dtos';
import {
  IScenario,
  IResource,
  IEpisode,
  IRestriction,
  IException,
  IActor,
} from '@/models';
import { ScenarioRepository, SymbolRepository } from '@/repositories';
import { BadRequestError, NotFoundError } from '@/utils/errors';
import { Lexicon, LexiconService } from './lexicon-service';
import { ProjectService } from './project-service';
import { ChangeService } from './change-service';

export interface ILexiconScenario {
  id: String;
  title: Lexicon;
  goal: Lexicon;
  context: {
    geographicLocation: Lexicon;
    temporalLocation: Lexicon;
    preCondition: Lexicon;
    restrictions: {
      description: Lexicon;
    }[];
  };
  exceptions: {
    description: Lexicon;
  }[];
  actors: {
    name: Lexicon;
  }[];
  resources: {
    name: Lexicon;
    restrictions?: {
      description: Lexicon;
    }[];
  }[];
  episodes: (
    | {
        position: number;
        restriction: Lexicon | {};
        description: Lexicon | {};
      }
    | {
        position: number;
        nonSequentialEpisodes: {
          restriction: Lexicon | {};
          description: Lexicon | {};
        }[];
      }
  )[];
  projectId: String;
}

export class ScenarioService {
  constructor(
    private symbolRepository = new SymbolRepository(),
    private scenarioRepository = new ScenarioRepository(),
    private projectService = new ProjectService(),
    private changeService = new ChangeService()
  ) {}
  async createManyScenarios(
    data: CreateManyScenariosRequestDTO
  ): Promise<void> {
    await this.scenarioRepository.createManyScenarios({
      ...data,
      scenarios: data.scenarios.filter(
        (scenario) =>
          scenario.title.trim().length
      ),
    });
  }

  async createScenario(
    data: CreateScenarioRequestDTO,
    userId: String
  ): Promise<IScenario> {
    const projectBeforeChange = await this.projectService.getCleanProject(
      data.projectId,
      false
    );
    const createdProject = await this.scenarioRepository.createScenario(data);
    const projectAfterChange = await this.projectService.getCleanProject(
      data.projectId,
      false
    );
    await this.changeService.createChange(
      projectBeforeChange,
      projectAfterChange,
      data.projectId,
      createdProject.title,
      userId
    );
    return createdProject;
  }

  async getAllScenarios(projectId: String): Promise<IScenario[]> {
    const scenarios = await this.scenarioRepository.getAllScenarios(projectId);
    return scenarios;
  }

  async getScenario(id: String): Promise<null | IScenario> {
    const scenario = await this.scenarioRepository.getScenario(id);
    if (!scenario) {
      throw new NotFoundError('Cenário inexistente');
    }
    return scenario;
  }

  async getScenarioWithLexicon(
    scenarioId: String,
    projectId: String
  ): Promise<ILexiconScenario> {
    const lexiconService = new LexiconService();
    const scenario = await this.scenarioRepository.getScenario(scenarioId);

    if (!scenario) {
      throw new BadRequestError('Cenário não existe');
    }

    const [symbols, scenarios] = await Promise.all([
      this.symbolRepository.getAllSymbols(projectId),
      this.scenarioRepository.getAllScenarios(projectId),
    ]);

    // retira o próprio cenário
    const scenarioIndex = scenarios.findIndex((current: IScenario) => {
      return current.id?.valueOf() === scenario?.id?.valueOf();
    });

    scenarios.splice(scenarioIndex, 1);

    scenario.context = scenario?.context
      ? scenario.context
      : {
          geographicLocation: '',
          temporalLocation: '',
          preCondition: '',
          restrictions: [],
        };

    const {
      title = '',
      goal = '',
      context: {
        geographicLocation = '',
        temporalLocation = '',
        preCondition = '',
        restrictions = [],
      } = {},
      exceptions = [],
      actors = [],
      resources = [],
      episodes = [],
    } = scenario;

    const processedLexicon = (content: string, searchOtherScenarios: boolean) =>
      lexiconService.processLexicon(
        content,
        symbols,
        scenarios,
        searchOtherScenarios
      );

    return {
      id: scenario?.id || '',
      title: processedLexicon(title, false),
      goal: processedLexicon(goal, false),
      context: {
        geographicLocation: processedLexicon(geographicLocation, false),
        temporalLocation: processedLexicon(temporalLocation, false),
        preCondition: processedLexicon(preCondition, true),
        restrictions: restrictions?.map((restriction: IRestriction) => ({
          description: processedLexicon(restriction.description, true),
        })),
      },
      exceptions: exceptions?.map((exception: IException) => ({
        description: processedLexicon(exception.description, true),
      })),
      actors: actors?.map((actor: IActor) => ({
        name: processedLexicon(actor.name, false),
      })),
      resources: resources?.map((resource: IResource) => ({
        id: resource.id,
        name: processedLexicon(resource.name, false),
        restrictions: resource.restrictions?.map(
          (restriction: IRestriction) => ({
            description: processedLexicon(restriction.description, true),
          })
        ),
      })),
      episodes: episodes
        ?.sort((a, b) => {
          if (a.position > b.position) return 1;
          return -1;
        })
        .map((episode: IEpisode) => {
          if (episode.nonSequentialEpisodes) {
            return {
              id: episode.id,
              position: episode.position,
              nonSequentialEpisodes: episode.nonSequentialEpisodes.map(
                (nonSequentialEpisode) => ({
                  id: nonSequentialEpisode.id,
                  type: nonSequentialEpisode.type,
                  restriction: nonSequentialEpisode.restriction ? processedLexicon(
                    nonSequentialEpisode.restriction,
                    true
                  ) : {},
                  description: processedLexicon(
                    nonSequentialEpisode.description,
                    false
                  ),
                })
              ),
            };
          }
          return {
            id: episode.id,
            position: episode.position,
            type: episode.type,
            restriction: episode?.restriction
              ? processedLexicon(episode?.restriction, true)
              : {},
            description: episode?.description
              ? processedLexicon(episode?.description, false)
              : {},
          };
        }),
      projectId,
    };
  }

  async updateScenario(
    id: String,
    data: UpdateScenarioRequestDTO,
    userId: String
  ): Promise<IScenario | null> {
    const scenario = await this.scenarioRepository.getScenario(id);
    if (!scenario) {
      return null;
    }

    const projectBeforeChange = await this.projectService.getCleanProject(
      data.projectId
    );
    const updatedScenario = await this.scenarioRepository.updateScenario(
      id,
      data
    );
    const projectAfterChange = await this.projectService.getCleanProject(
      data.projectId
    );
    await this.changeService.createChange(
      projectBeforeChange,
      projectAfterChange,
      data.projectId,
      data.title || scenario.title,
      userId
    );
    return updatedScenario;
  }

  async deleteScenario(id: String, userId: String): Promise<void> {
    const scenario = await this.scenarioRepository.getScenario(id);
    if (!scenario) {
      throw new BadRequestError('Cenário inválido ou inexistente');
    }
    const projectBeforeChange = await this.projectService.getCleanProject(
      scenario.project,
      false
    );
    await this.scenarioRepository.deleteScenario(id);
    const projectAfterChange = await this.projectService.getCleanProject(
      scenario.project,
      false
    );
    await this.changeService.createChange(
      projectBeforeChange,
      projectAfterChange,
      scenario.project,
      scenario.title,
      userId
    );
  }
}
