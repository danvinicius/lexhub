import { UpdateScenarioRequestDTO } from "../../../domain/dto/update-scenario-request-dto";
import { IScenario } from "../../../domain/entities/scenario";

export interface UpdateScenarioUseCase {
  execute(id: string | number, scenario: UpdateScenarioRequestDTO): Promise<void>;
}
