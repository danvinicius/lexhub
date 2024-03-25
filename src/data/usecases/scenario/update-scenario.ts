import { ScenarioRepository } from "@/data/protocols/db";
import { UpdateScenario } from "@/domain/use-cases/scenario";

export class DbUpdateScenario implements UpdateScenario {
  private scenarioRepository: ScenarioRepository;

  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute({ id, scenario }: UpdateScenario.Params): Promise<void> {
    return await this.scenarioRepository.updateScenario(id, scenario);
  }
}
