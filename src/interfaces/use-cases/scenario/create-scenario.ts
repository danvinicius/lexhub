import { Scenario } from "../../../domain/entities/scenario";

export interface CreateScenarioUseCase {
  execute(scenario: Scenario): Promise<Scenario>;
}
