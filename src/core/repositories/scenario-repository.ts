import { CreateScenarioRequestDTO } from "../../domain/dto/create-scenario-request-dto";
import { UpdateScenarioRequestDTO } from "../../domain/dto/update-scenario-request-dto";
import { IScenario } from "../../domain/entities/scenario";

export interface ScenarioRepository {
  getScenario(id: string | number): Promise<null | IScenario>;
  getAllScenarios(projectId: string | number): Promise<IScenario[]>;
  createScenario(scenario: CreateScenarioRequestDTO): Promise<IScenario>;
  updateScenario(id: string | number, scenario: UpdateScenarioRequestDTO): Promise<void>;
  deleteScenario(id: string | number): Promise<void>;
}
