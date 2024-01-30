import { Scenario } from "../../../entities/scenario";

export interface UpdateScenarioUseCase {
  execute(id: string | number, scenario: Scenario): Promise<Scenario>;
}
