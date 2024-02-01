import { Scenario } from "../../../domain/entities/scenario";

export interface GetScenarioUseCase {
  execute(id: string | number): Promise<null | Scenario>;
}
