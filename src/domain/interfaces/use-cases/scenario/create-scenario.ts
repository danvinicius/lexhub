import { Scenario } from "../../../entities/scenario";

export interface CreateScenarioUseCase {
  execute(scenario: Scenario): Promise<Scenario>;
}
