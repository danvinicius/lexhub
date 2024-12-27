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

const symbolRepository = new SymbolRepository();
const scenarioRepository = new ScenarioRepository();
const lexiconService = new LexiconService();

export interface ILexiconScenario {
  id: string;
  title: {
    content: string;
    foundLexicons: Lexicon[];
  };
  goal: {
    content: string;
    foundLexicons: Lexicon[];
  };
  context: {
    geographicLocation: {
      content: string;
      foundLexicons: Lexicon[];
    };
    temporalLocation: {
      content: string;
      foundLexicons: Lexicon[];
    };
    preCondition: {
      content: string;
      foundLexicons: Lexicon[];
    };
    restrictions: {
      description: {
        content: string;
        foundLexicons: Lexicon[];
      };
    }[];
  };
  exceptions: {
    description: {
      content: string;
      foundLexicons: Lexicon[];
    };
  }[];
  actors: {
    name: {
      content: string;
      foundLexicons: Lexicon[];
    };
  }[];
  resources: {
    name: {
      content: string;
      foundLexicons: Lexicon[];
    };
    restrictions: {
      description: {
        content: string;
        foundLexicons: Lexicon[];
      };
    }[];
  }[];
  episodes: (
    | {
        position: number;
        restriction: {
          content: string;
          foundLexicons: Lexicon[];
        };
        description: {
          content: string;
          foundLexicons: Lexicon[];
        };
      }
    | {
        position: number;
        nonSequentialEpisodes: {
          restriction: {
            content: string;
            foundLexicons: Lexicon[];
          };
          description: {
            content: string;
            foundLexicons: Lexicon[];
          };
        }[];
      }
  )[];
  projectId: string;
}

export class ScenarioService {
  async createManyScenarios(
    data: CreateManyScenariosRequestDTO
  ): Promise<IScenario[]> {
    return await scenarioRepository.createManyScenarios(data);
  }

  async createScenario(scenario: CreateScenarioRequestDTO): Promise<IScenario> {
    return await scenarioRepository.createScenario(scenario);
  }

  async deleteScenario(id: string): Promise<void> {
    const scenarioExists = await scenarioRepository.getScenario(id);
    if (!scenarioExists) {
      throw new BadRequestError('Cenário inválido ou inexistente');
    }
    await scenarioRepository.deleteScenario(id);
  }

  async getAllScenarios(projectId: string): Promise<IScenario[]> {
    const scenarios = await scenarioRepository.getAllScenarios(projectId);
    return scenarios;
  }

  async getScenario(id: string): Promise<null | IScenario> {
    const scenario = await scenarioRepository.getScenario(id);
    if (!scenario) {
      throw new NotFoundError('Cenário inexistente');
    }
    return scenario;
  }

  async getScenarioWithLexicon(
    scenarioId: string,
    projectId: string
  ): Promise<ILexiconScenario> {
    const scenario = await scenarioRepository.getScenario(scenarioId);

    const [symbols, scenarios] = await Promise.all([
      symbolRepository.getAllSymbols(projectId),
      scenarioRepository.getAllScenarios(projectId),
    ]);

    // retira o próprio cenário
    const scenarioIndex = scenarios.findIndex((current: IScenario) => {
      return current.id?.valueOf() === scenario?.id?.valueOf();
    });

    scenarios.splice(scenarioIndex, 1);

    scenario.context = scenario.context
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
      id: scenario.id,
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
                  restriction: processedLexicon(
                    nonSequentialEpisode.restriction,
                    true
                  ),
                  description: processedLexicon(
                    nonSequentialEpisode.description,
                    false
                  ),
                })
              ),
            };
          }
          return {
            position: episode.position,
            type: episode.type,
            restriction: processedLexicon(episode.restriction, true),
            description: processedLexicon(episode.description, false),
          };
        }),
      projectId,
    };
  }

  async updateScenario(
    id: string,
    scenario: UpdateScenarioRequestDTO
  ): Promise<IScenario> {
    const scenarioExists = await scenarioRepository.getScenario(id);
    if (!scenarioExists) {
      throw new BadRequestError('Cenário inválido ou inexistente');
    }
    return await scenarioRepository.updateScenario(id, scenario);
  }
}
