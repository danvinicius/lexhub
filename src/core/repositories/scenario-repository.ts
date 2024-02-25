import { AddContextRequestDTO } from "../../application/http/dtos/add-context-request-dto";
import { AddExceptionRequestDTO } from "../../application/http/dtos/add-exception-request-dto";
import { AddRestrictionRequestDTO } from "../../application/http/dtos/add-restriction-request-dto";
import { CreateScenarioRequestDTO } from "../../application/http/dtos/create-scenario-request-dto";
import { UpdateScenarioRequestDTO } from "../../application/http/dtos/update-scenario-request-dto";
import { IScenario } from "../domain/entities/scenario";

export interface ScenarioRepository {
  getScenario(id: string | number): Promise<null | IScenario>;
  getAllScenarios(projectId: string | number): Promise<IScenario[]>;
  createScenario(scenario: CreateScenarioRequestDTO): Promise<IScenario>;
  addException(data: AddExceptionRequestDTO): Promise<void>
  addContext(data: AddContextRequestDTO): Promise<void>
  addRestriction(data: AddRestrictionRequestDTO): Promise<void>
  removeException(id: string | number): Promise<void>
  removeContext(id: string | number): Promise<void>
  removeRestriction(id: string | number): Promise<void>
  updateScenario(id: string | number, scenario: UpdateScenarioRequestDTO): Promise<void>;
  deleteScenario(id: string | number): Promise<void>;
}
