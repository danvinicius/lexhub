import { IScenario } from "../../../domain/entities/scenario";

export interface GetAllScenariosUseCase {
  execute(projectId: number | string): Promise<IScenario[]>;
}
