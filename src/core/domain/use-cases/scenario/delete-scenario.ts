import { ScenarioRepository } from "../../../repositories/scenario-repository";
import { DeleteScenarioUseCase } from "./interfaces";

export class DeleteScenario implements DeleteScenarioUseCase {
  private scenarioRepository: ScenarioRepository;

  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }

  async execute(id: string): Promise<void> {
    await this.scenarioRepository.deleteScenario(id);
  }
}
