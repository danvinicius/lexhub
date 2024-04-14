import { IScenario } from '@/entities';

export interface ScenarioRepository {
  getScenario(id: number | string): Promise<null | IScenario>;
  getAllScenarios(projectId: number | string): Promise<IScenario[]>;
  createScenario(
    scenario: ScenarioRepository.CreateScenarioParams
  ): Promise<IScenario>;
  createManyScenarios(
    scenarios: ScenarioRepository.CreateManyScenariosParams
  ): Promise<IScenario[]>;
  createException(
    data: ScenarioRepository.CreateExceptionParams
  ): Promise<void>;
  createContext(data: ScenarioRepository.CreateContextParams): Promise<void>;
  createRestriction(
    data: ScenarioRepository.CreateRestrictionParams
  ): Promise<void>;
  createActor(data: ScenarioRepository.CreateActorParams): Promise<void>;
  createResource(data: ScenarioRepository.CreateResourceParams): Promise<void>;
  createEpisode(data: ScenarioRepository.CreateEpisodeParams): Promise<void>;
  addActor(
    scenarioId: number | string,
    actorId: number | string
  ): Promise<void>;
  addResource(
    scenarioId: number | string,
    resourceId: number | string
  ): Promise<void>;
  deleteException(id: number | string): Promise<void>;
  deleteContext(id: number | string): Promise<void>;
  deleteRestriction(id: number | string): Promise<void>;
  deleteActor(id: number | string): Promise<void>;
  deleteResource(id: number | string): Promise<void>;
  deleteEpisode(id: number | string): Promise<void>;
  deleteGroup(id: number | string): Promise<void>;
  removeActor(
    scenarioId: number | string,
    actorId: number | string
  ): Promise<void>;
  removeResource(
    scenarioId: number | string,
    resourceId: number | string
  ): Promise<void>;
  updateScenario(
    id: number | string,
    scenario: ScenarioRepository.UpdateScenarioParams
  ): Promise<void>;
  deleteScenario(id: number | string): Promise<void>;
}

export namespace ScenarioRepository {
  export interface CreateScenarioParams {
    title: string;
    goal: string;
    projectId: number | string;
  }
  export interface CreateManyScenariosParams {
    scenarios: {
      title: string;
      goal: string;
    }[];
    projectId: number | string;
  }
  export interface CreateExceptionParams {
    description: string;
    scenarioId: number | string;
  }
  export interface CreateContextParams {
    geographicLocation: string;
    temporalLocation: string;
    preCondition: string;
    scenarioId: number | string;
  }
  export interface CreateRestrictionParams {
    description: string;
    scenarioId: number | string;
    episodeId: number | string;
    resourceId: number | string;
    contextId: number | string;
  }
  export interface CreateActorParams {
    name: string;
    scenarioId: number | string;
  }
  export interface CreateResourceParams {
    name: string;
    scenarioId: number | string;
  }
  export interface CreateEpisodeParams {
    position: number;
    description: string;
    type: string;
    group: number | string;
    scenarioId: number | string;
  }
  export interface UpdateScenarioParams {
    title: string;
    goal: string;
  }
}
