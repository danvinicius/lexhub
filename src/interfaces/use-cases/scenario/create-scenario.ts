import { CreateScenarioRequestDTO } from "../../../domain/dto/create-scenario-request-dto";
import { IScenario } from "../../../domain/entities/scenario";

export interface CreateScenarioUseCase {
  execute(scenario: CreateScenarioRequestDTO): Promise<IScenario>;
}
