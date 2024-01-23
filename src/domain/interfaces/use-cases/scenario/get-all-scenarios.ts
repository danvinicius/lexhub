import { Scenario } from "../../../entities/scenario";

export interface GetAllScenariosUseCase {
  execute(): Promise<Scenario[]>;
}
