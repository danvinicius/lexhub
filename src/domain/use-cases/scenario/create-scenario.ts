import { Scenario } from "../../entities/scenario";
import { ScenarioRepository } from "../../interfaces/repositories/scenario-repository";
import { CreateScenarioUseCase } from "../../interfaces/use-cases/scenario/create-scenario";

export class CreateScenario implements CreateScenarioUseCase {
  private scenarioRepository: ScenarioRepository;

  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }

  async execute(scenario: Scenario): Promise<string | number> {
    const scenarioId = await this.scenarioRepository.createScenario(scenario);
    return scenarioId;
  }
}
