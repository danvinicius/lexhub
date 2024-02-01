import { Scenario } from "../../domain/entities/scenario";

export interface ScenarioRepository {
  getScenario(id: string | number): Promise<Scenario>;
  getAllScenarios(): Promise<Scenario[]>;
  createScenario(scenario: Scenario): Promise<undefined | Scenario>;
  updateScenario(id: string | number, scenario: Scenario): Promise<undefined | Scenario>;
  deleteScenario(id: string | number): Promise<void>;
}
