import { Scenario } from "../../entities/scenario";
import { ScenarioRepository } from "../../interfaces/repositories/scenario-repository";
import { UpdateScenarioUseCase } from "../../interfaces/use-cases/scenario/update-scenario";

export class UpdateScenario implements UpdateScenarioUseCase {
  private scenarioRepository: ScenarioRepository;

  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute(id: string, scenario: Scenario): Promise<void> {
    await this.scenarioRepository.updateScenario(id, scenario);
  }
}
