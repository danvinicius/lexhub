import { IScenario } from "@/domain/entities";
import { ScenarioRepository } from "@/data/protocols/db";
import { GetScenario } from "@/domain/use-cases/scenario";

export class DbGetScenario implements GetScenario {
  private scenarioRepository: ScenarioRepository;

  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute(id: number | string): Promise<null | IScenario> {
    const scenario = this.scenarioRepository.getScenario(id);
    return scenario;
  }
}
