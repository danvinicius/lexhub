import { UpdateScenarioRequestDTO } from "../../../../../application/http/dtos/update-scenario-request-dto";

export interface UpdateScenarioUseCase {
  execute(id: string | number, scenario: UpdateScenarioRequestDTO): Promise<void>;
}
