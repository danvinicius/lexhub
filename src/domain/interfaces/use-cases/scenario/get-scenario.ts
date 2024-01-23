import { Scenario } from "../../../entities/scenario";

export interface GetScenarioUseCase {
  execute(id: string | number): Promise<null | Scenario>;
}
