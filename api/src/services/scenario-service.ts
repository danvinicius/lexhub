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
  IProject,
  ISymbol,
  IGroup,
  INonSequentialEpisode,
} from '@/models';
import {
  ScenarioRepository,
  SymbolRepository,
} from '@/repositories';
import { BadRequestError, NotFoundError } from '@/utils/errors';
import { normalize } from '@/utils/string/normalize';

const symbolRepository = new SymbolRepository();
const scenarioRepository = new ScenarioRepository();

export interface Lexicon {
  resource: string;
  name: string;
  starts: number;
  ends: number;
  type: string;
}

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
  episodes: ({
    position: number;
    restriction: {
        content: string;
        foundLexicons: Lexicon[];
    };
    description: {
      content: string;
      foundLexicons: Lexicon[];
    };
  } | {
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
  })[];
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
      this.processLexicon(content, symbols, scenarios, searchOtherScenarios);
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
      episodes: episodes?.sort((a, b) => {
        if (a.position > b.position) return 1;
        return -1;
      }).map((episode: IEpisode & IGroup) => {
        if (episode.nonSequentialEpisodes) {
          return {
            id: episode.id,
            position: episode.position,
            nonSequentialEpisodes: episode.nonSequentialEpisodes.map(
              (nonSequentialEpisode: INonSequentialEpisode) => ({
                id: nonSequentialEpisode.id,
                restriction: processedLexicon(nonSequentialEpisode.restriction, false),
                description: processedLexicon(
                  nonSequentialEpisode.description,
                  false
                ),
              })
            ),
          }
        }
        return {
          position: episode.position,
          type: episode.type,
          restriction:  processedLexicon(episode.restriction, true),
          description: processedLexicon(episode.description, false),
        }
      }),
      projectId,
    };
  }

  private findPossibleLexicon = <
    T extends { name?: string; title?: string; id?: string; project: IProject },
  >(
    text: string,
    termos: T[]
  ) => {
    const possibleLexicon: Lexicon[] = [];

    for (const termo of termos) {
      const lexiconName = termo.name || termo.title || '';
      let starts = -1;
      while (true) {
        starts = normalize(text).indexOf(normalize(lexiconName), starts + 1);
        if (starts == -1) {
          break;
        }
        const ends = starts + lexiconName.length;
        const { id } = termo;
        if (id) {
          possibleLexicon.push({
            resource: termo.title
              ? `/api/project/${termo.project.id}/scenario/${id}`
              : `/api/project/${termo.project.id}/symbol/${id}`,
            name: lexiconName,
            starts,
            ends,
            type: termo.title ? 'cenário' : 'símbolo',
          });
        }
      }
    }

    return possibleLexicon;
  };

  //   　　　　/)─―ヘ
  // 　　　＿／　　　　＼
  // 　 ／　　　　●　　　●丶
  // 　｜　　　　　　　▼　|
  // 　｜　　　　　　　▽ノ
  // 　 U￣U￣￣￣￣U￣U
  // aqui que a mágica acontece

  private processLexicon = (
    content: string,
    symbols: ISymbol[],
    scenarios: IScenario[],
    searchOtherScenarios: boolean
  ) => {
    const foundLexicons: Lexicon[] = [];

    const possibleSymbols = this.findPossibleLexicon(content, symbols);
    let possibleScenarios: Lexicon[] = [];
    if (searchOtherScenarios) {
      possibleScenarios = this.findPossibleLexicon(content, scenarios);
    }

    // primeiro, o cenário compete com outros cenários dentro do text
    const scenariosFilter = (candidate: Lexicon) => {
      return !possibleScenarios.some((scenario) => {
        return (
          scenario !== candidate &&
          scenario.starts <= candidate.starts &&
          scenario.ends >= candidate.ends
        );
      });
    };

    // depois, o símbolo compete com cenários (cenários tem prioridade) e depois com outros símbolos
    const symbolsFilter = (candidate: Lexicon) => {
      return (
        !possibleScenarios.some((scenario) => {
          return (
            scenario.starts <= candidate.starts &&
            scenario.ends >= candidate.ends
          );
        }) &&
        !possibleSymbols.some((outro) => {
          return (
            outro !== candidate &&
            outro.starts <= candidate.starts &&
            outro.ends >= candidate.ends + 1
          );
        })
      );
    };

    foundLexicons.push(...possibleScenarios.filter(scenariosFilter));
    foundLexicons.push(...possibleSymbols.filter(symbolsFilter));

    foundLexicons.sort(this.orderByPosition);

    return {
      content,
      foundLexicons,
    };
  };

  private orderByPosition = (a: Lexicon, b: Lexicon) => {
    if (a.starts > b.starts) {
      return 1;
    }
    if (b.starts > a.starts) {
      return -1;
    }
    return 0;
  };

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
