import { IScenario } from "../../../entities/scenario";

export interface GetAllScenariosUseCase {
  execute(projectId: number | string): Promise<IScenario[]>;
}
