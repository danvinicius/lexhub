import { ScenarioRepository } from "@/data/protocols/db";
import { DeleteScenario } from "@/domain/use-cases/scenario";

export class DbDeleteScenario implements DeleteScenario {
  private scenarioRepository: ScenarioRepository;

  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }

  async execute(id: string): Promise<void> {
    await this.scenarioRepository.deleteScenario(id);
  }
}
