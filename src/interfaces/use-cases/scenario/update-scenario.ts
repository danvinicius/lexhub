import { Scenario } from "../../../domain/entities/scenario";

export interface UpdateScenarioUseCase {
  execute(id: string | number, scenario: Scenario): Promise<Scenario>;
}
