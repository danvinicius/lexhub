import { ScenarioRepository } from "../../../interfaces/repositories/scenario-repository";
import { DeleteScenarioUseCase } from "../../../interfaces/use-cases/scenario/delete-scenario";

export class DeleteScenario implements DeleteScenarioUseCase {
  private scenarioRepository: ScenarioRepository;

  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }

  async execute(id: string): Promise<void> {
    await this.scenarioRepository.deleteScenario(id);
  }
}
