import { IScenario } from "../../../entities/scenario";

export interface GetScenarioUseCase {
  execute(id: number | string): Promise<null | IScenario>;
}
