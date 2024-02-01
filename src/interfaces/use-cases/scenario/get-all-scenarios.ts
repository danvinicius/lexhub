import { Scenario } from "../../../domain/entities/scenario";

export interface GetAllScenariosUseCase {
  execute(): Promise<Scenario[]>;
}
