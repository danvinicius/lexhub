import { ScenarioRepository } from "../../../repositories/scenario-repository";
import { UpdateScenarioUseCase } from "./interfaces/update-scenario";
import { UpdateScenarioRequestDTO } from "../../../../application/http/dtos/update-scenario-request-dto";

export class UpdateScenario implements UpdateScenarioUseCase {
  private scenarioRepository: ScenarioRepository;

  constructor(
    scenarioRepository: ScenarioRepository
  ) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute(id: number | string, scenario: UpdateScenarioRequestDTO): Promise<void> {
    return await this.scenarioRepository.updateScenario(
      id,
      scenario
    );
  }
}
