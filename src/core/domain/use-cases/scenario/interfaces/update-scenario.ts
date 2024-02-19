import { UpdateScenarioRequestDTO } from "../../../../../application/dtos/update-scenario-request-dto";

export interface UpdateScenarioUseCase {
  execute(id: string | number, scenario: UpdateScenarioRequestDTO): Promise<void>;
}
