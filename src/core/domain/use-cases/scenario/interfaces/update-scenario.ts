import { UpdateScenarioRequestDTO } from "../../../../../application/http/dtos/update-scenario-request-dto";

export interface UpdateScenarioUseCase {
  execute(id: number | string, scenario: UpdateScenarioRequestDTO): Promise<void>;
}
