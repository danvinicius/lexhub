import { CreateActorRequestDTO, CreateContextRequestDTO, CreateEpisodeRequestDTO, CreateExceptionRequestDTO, CreateManyScenariosRequestDTO, CreateResourceRequestDTO, CreateRestrictionRequestDTO, CreateScenarioRequestDTO, UpdateScenarioRequestDTO } from '@/infra/http/dtos';
import { IScenario, IResource, IEpisode, IRestriction, IException, IActor, IProject, ISymbol } from '@/models';
import { ScenarioRepository, SymbolRepository } from '@/repositories';
import { InvalidParamError, NotFoundError } from '@/utils/errors';
import { AddOrRemoveEntity } from '@/utils/share';

const symbolRepository = new SymbolRepository();
const scenarioRepository = new ScenarioRepository();

export namespace ScenarioService {
  export interface UpdateScenarioParams {
    id: number;
    scenario: UpdateScenarioRequestDTO;
  }
}

export interface FoundLexicon {
  resource: string;
  name: string;
  starts: number;
  ends: number;
  type: string;
}

export class ScenarioService {
  async addActor({ scenarioId, resourceId }: AddOrRemoveEntity): Promise<void> {
    const scenarioExists = await scenarioRepository.getScenario(scenarioId);
    if (!scenarioExists) {
      throw new InvalidParamError('scenarioId');
    }
    return await scenarioRepository.addResource(scenarioId, resourceId);
  }

  async addResource({ scenarioId, resourceId }: AddOrRemoveEntity): Promise<void> {
    const scenarioExists =
      await scenarioRepository.getScenario(scenarioId);
    if (!scenarioExists) {
      throw new InvalidParamError('scenarioId');
    }
    return await scenarioRepository.addResource(scenarioId, resourceId);
  }

  async createActor(actor: CreateActorRequestDTO): Promise<void> {
    const scenarioExists = await scenarioRepository.getScenario(
      actor.scenarioId
    );
    if (!scenarioExists) {
      throw new InvalidParamError('scenarioId');
    }
    return await scenarioRepository.createActor(actor);
  }

  async createContext(context: CreateContextRequestDTO): Promise<void> {
    const scenarioExists = await scenarioRepository.getScenario(
      context.scenarioId
    );
    if (!scenarioExists) {
      throw new InvalidParamError('scenarioId');
    }
    return await scenarioRepository.createContext(context);
  }

  async createEpisode(episode: CreateEpisodeRequestDTO): Promise<void> {
    const scenarioExists = await scenarioRepository.getScenario(
      episode.scenarioId
    );
    if (!scenarioExists) {
      throw new InvalidParamError('scenarioId');
    }
    return await scenarioRepository.createEpisode(episode);
  }

  async createException(exception: CreateExceptionRequestDTO): Promise<void> {
    const scenarioExists = await scenarioRepository.getScenario(
      exception.scenarioId
    );
    if (!scenarioExists) {
      throw new InvalidParamError('scenarioId');
    }
    return await scenarioRepository.createException(exception);
  }

  async createManyScenarios(data: CreateManyScenariosRequestDTO): Promise<IScenario[]> {
    return await scenarioRepository.createManyScenarios(data);
  }

  async createResource(resource: CreateResourceRequestDTO): Promise<void> {
    const scenarioExists = await scenarioRepository.getScenario(
      resource.scenarioId
    );
    if (!scenarioExists) {
      throw new InvalidParamError('scenarioId');
    }
    return await scenarioRepository.createResource(resource);
  }

  async createRestriction(context: CreateRestrictionRequestDTO): Promise<void> {
    const scenarioExists = await scenarioRepository.getScenario(
      context.scenarioId
    );
    if (!scenarioExists) {
      throw new InvalidParamError('scenarioId');
    }
    const resource = scenarioExists.resources?.find(
      (r: IResource) => r.id == context?.resourceId
    );
    const episode = scenarioExists.episodes?.find(
      (r: IEpisode) => r.id == context?.episodeId
    );
    if (context.resourceId && !resource) {
      throw new InvalidParamError('resourceId');
    }
    if (context.episodeId && !episode) {
      throw new InvalidParamError('episodeId');
    }
    return await scenarioRepository.createRestriction(context);
  }

  async createScenario(scenario: CreateScenarioRequestDTO): Promise<IScenario> {
    return await scenarioRepository.createScenario(scenario);
  }

  async deleteActor(id: number): Promise<void> {
    return await scenarioRepository.deleteActor(id);
  }

  async deleteContext(id: number): Promise<void> {
    return await scenarioRepository.deleteContext(id);
  }

  async deleteEpisode(id: number): Promise<void> {
    return await scenarioRepository.deleteEpisode(id);
  }

  async deleteException(id: number): Promise<void> {
    return await scenarioRepository.deleteException(id);
  }

  async deleteGroup(id: number): Promise<void> {
    return await scenarioRepository.deleteGroup(id);
  }

  async deleteResource(id: number): Promise<void> {
    return await scenarioRepository.deleteResource(id);
  }

  async deleteRestriction(id: number): Promise<void> {
    return await scenarioRepository.deleteRestriction(id);
  }

  async deleteScenario(id: number): Promise<void> {
    const scenarioExists = await scenarioRepository.getScenario(id);
    if (!scenarioExists) {
      throw new InvalidParamError('scenarioId');
    }
    await scenarioRepository.deleteScenario(id);
  }

  async getAllScenarios(projectId: number): Promise<IScenario[]> {
    const scenarios = await scenarioRepository.getAllScenarios(projectId);
    return scenarios;
  }

  async getScenario(id: number): Promise<null | IScenario> {
    const scenario = await scenarioRepository.getScenario(id);
    if (!scenario) {
      throw new NotFoundError('Scenario not found');
    }
    return scenario;
  }

  async getScenarioWithLexicon(id: number | number) {
    const scenario = await scenarioRepository.getScenario(id);

    if (!scenario || !scenario.project.id) {
      throw new NotFoundError('Scenario not found');
    }

    const [symbols, scenarios] = await Promise.all([
      symbolRepository.getAllSymbols(scenario.project.id),
      scenarioRepository.getAllScenarios(scenario.project.id),
    ]);

    // retira o próprio cenário
    const scenarioIndex = scenarios.findIndex((c: IScenario) => {
      return c.id?.valueOf() === scenario?.id?.valueOf();
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
    } = scenario;

    const findLexicon = (text: string, searchOtherScenarios: boolean) =>
      this.findLexicons(text, symbols, scenarios, searchOtherScenarios);

    return {
      title: findLexicon(title, false),
      goal: findLexicon(goal, false),
      context: {
        geographicLocation: findLexicon(geographicLocation, false),
        temporalLocation: findLexicon(temporalLocation, false),
        preCondition: findLexicon(preCondition, true),
        restrictions: restrictions.map((restriction: IRestriction) =>
          findLexicon(restriction.description, true)
        ),
      },
      exceptions: exceptions.map((exception: IException) =>
        findLexicon(exception.description, true)
      ),
      actors: actors.map((actor: IActor) => findLexicon(actor.name, false)),
      resources: resources.map((resource: IResource) =>
        findLexicon(resource.name, false)
      ),
    };
  }

  private findPossibleLexicons = <
    T extends { name?: string; title?: string; id?: number; project: IProject },
  >(
    text: string,
    termos: T[]
  ) => {
    const possibleLexicons: FoundLexicon[] = [];

    for (const termo of termos) {
      const lexiconName = termo.name || termo.title || '';
      let starts = -1;
      while (true) {
        starts = this.normalize(text).indexOf(
          this.normalize(lexiconName),
          starts + 1
        );
        if (starts == -1) {
          break;
        }
        const ends = starts + lexiconName.length;
        const { id } = termo;
        if (id) {
          possibleLexicons.push({
            resource: termo.title ? `/api/project/${termo.project.id}/scenario/${id}` : `/api/project/${termo.project.id}/symbol/${id}`,
            name: lexiconName,
            starts,
            ends,
            type: termo.title ? 'cenário' : 'símbolo',
          });
        }
      }
    }

    return possibleLexicons;
  };

  //   　　　　/)─―ヘ
  // 　　　＿／　　　　＼
  // 　 ／　　　　●　　　●丶
  // 　｜　　　　　　　▼　|
  // 　｜　　　　　　　▽ノ
  // 　 U￣U￣￣￣￣U￣U
  // aqui que a mágica acontece

  private findLexicons = (
    content: string,
    symbols: ISymbol[],
    scenarios: IScenario[],
    searchOtherScenarios: boolean
  ) => {
    const foundLexicons: FoundLexicon[] = [];

    const possibleSymbols = this.findPossibleLexicons(content, symbols);
    let possibleScenarios: FoundLexicon[] = [];
    if (searchOtherScenarios) {
      possibleScenarios = this.findPossibleLexicons(content, scenarios);
    }

    // primeiro, o cenário compete com outros cenários dentro do text
    const scenariosFilter = (candidate: FoundLexicon) => {
      return !possibleScenarios.some((scenario) => {
        return (
          scenario !== candidate &&
          scenario.starts <= candidate.starts &&
          scenario.ends >= candidate.ends
        );
      });
    };

    // depois, o símbolo compete com cenários (cenários tem prioridade) e depois com outros símbolos
    const symbolsFilter = (candidate: FoundLexicon) => {
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
            outro.ends >= candidate.ends
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

  private normalize = (str: string) => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  private orderByPosition = (a: FoundLexicon, b: FoundLexicon) => {
    if (a.starts > b.starts) {
      return 1;
    }
    if (b.starts > a.starts) {
      return -1;
    }
    return 0;
  };

  async removeActor({ actorId, scenarioId }: AddOrRemoveEntity): Promise<void> {
    const scenarioExists =
      await scenarioRepository.getScenario(scenarioId);
    if (!scenarioExists) {
      throw new InvalidParamError('scenarioId');
    }
    return await scenarioRepository.removeActor(scenarioId, actorId);
  }

  async removeResource({ resourceId, scenarioId }: AddOrRemoveEntity): Promise<void> {
    const scenarioExists =
    await scenarioRepository.getScenario(scenarioId);
    if (!scenarioExists) {
      throw new InvalidParamError('scenarioId');
    }
    return await scenarioRepository.removeResource(scenarioId, resourceId);
  }

  async updateScenario({ id, scenario }: ScenarioService.UpdateScenarioParams): Promise<void> {
    const scenarioExists = await scenarioRepository.getScenario(id);
    if (!scenarioExists) {
      throw new InvalidParamError('scenarioId');
    }
    return await scenarioRepository.updateScenario(id, scenario);
  }
}
