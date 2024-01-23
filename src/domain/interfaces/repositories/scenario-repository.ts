import { Scenario } from "../../entities/scenario";

export interface ScenarioRepository {
  getScenario(id: string | number): Promise<null | Scenario>;
  getAllScenarios(): Promise<Scenario[]>;
  createScenario(scenario: Scenario): Promise<string | number>;
  updateScenario(id: string | number, scenario: Scenario): Promise<void>;
  deleteScenario(id: string | number): Promise<void>;
}
