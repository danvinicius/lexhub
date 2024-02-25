import { CreateContextRequestDTO } from "../../application/http/dtos/create-context-request-dto";
import { CreateExceptionRequestDTO } from "../../application/http/dtos/create-exception-request-dto";
import { CreateRestrictionRequestDTO } from "../../application/http/dtos/create-restriction-request-dto";
import { CreateScenarioRequestDTO } from "../../application/http/dtos/create-scenario-request-dto";
import { UpdateScenarioRequestDTO } from "../../application/http/dtos/update-scenario-request-dto";
import { IScenario } from "../domain/entities/scenario";

export interface ScenarioRepository {
  getScenario(id: string | number): Promise<null | IScenario>;
  getAllScenarios(projectId: string | number): Promise<IScenario[]>;
  createScenario(scenario: CreateScenarioRequestDTO): Promise<IScenario>;
  createScenario(scenario: CreateScenarioRequestDTO): Promise<IScenario>;
  createException(data: CreateExceptionRequestDTO): Promise<void>
  createContext(data: CreateContextRequestDTO): Promise<void>
  createRestriction(data: CreateRestrictionRequestDTO): Promise<void>
  deleteException(id: string | number): Promise<void>
  deleteContext(id: string | number): Promise<void>
  deleteRestriction(id: string | number): Promise<void>
  updateScenario(id: string | number, scenario: UpdateScenarioRequestDTO): Promise<void>;
  deleteScenario(id: string | number): Promise<void>;
}
