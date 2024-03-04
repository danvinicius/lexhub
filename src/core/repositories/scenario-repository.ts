import { CreateActorRequestDTO } from "../../application/http/dtos/create-actor-request-dto";
import { CreateContextRequestDTO } from "../../application/http/dtos/create-context-request-dto";
import { CreateEpisodeRequestDTO } from "../../application/http/dtos/create-episode.request-dto";
import { CreateExceptionRequestDTO } from "../../application/http/dtos/create-exception-request-dto";
import { CreateManyScenariosRequestDTO } from "../../application/http/dtos/create-many-scenarios-request-dto";
import { CreateResourceRequestDTO } from "../../application/http/dtos/create-resource-request-dto";
import { CreateRestrictionRequestDTO } from "../../application/http/dtos/create-restriction-request-dto";
import { CreateScenarioRequestDTO } from "../../application/http/dtos/create-scenario-request-dto";
import { UpdateScenarioRequestDTO } from "../../application/http/dtos/update-scenario-request-dto";
import { IScenario } from "../domain/entities/scenario";

export interface ScenarioRepository {
  getScenario(id: number | string): Promise<null | IScenario>;
  getAllScenarios(projectId: number | string): Promise<IScenario[]>;
  createScenario(scenario: CreateScenarioRequestDTO): Promise<IScenario>;
  createManyScenarios(scenarios: CreateManyScenariosRequestDTO): Promise<IScenario[]>;
  createScenario(scenario: CreateScenarioRequestDTO): Promise<IScenario>;
  createException(data: CreateExceptionRequestDTO): Promise<void>
  createContext(data: CreateContextRequestDTO): Promise<void>
  createRestriction(data: CreateRestrictionRequestDTO): Promise<void>
  createActor(data: CreateActorRequestDTO): Promise<void>
  createResource(data: CreateResourceRequestDTO): Promise<void>
  createEpisode(data: CreateEpisodeRequestDTO): Promise<void>
  addActor(scenarioId: number | string, actorId: number | string): Promise<void>
  addResource(scenarioId: number | string, resourceId: number | string): Promise<void>
  deleteException(id: number | string): Promise<void>
  deleteContext(id: number | string): Promise<void>
  deleteRestriction(id: number | string): Promise<void>
  deleteActor(id: number | string): Promise<void>
  deleteResource(id: number | string): Promise<void>
  deleteEpisode(id: number | string): Promise<void>
  deleteGroup(id: number | string): Promise<void>
  removeActor(scenarioId: number | string, actorId: number | string): Promise<void>
  removeResource(scenarioId: number | string, resourceId: number | string): Promise<void>
  updateScenario(id: number | string, scenario: UpdateScenarioRequestDTO): Promise<void>;
  deleteScenario(id: number | string): Promise<void>;
}
