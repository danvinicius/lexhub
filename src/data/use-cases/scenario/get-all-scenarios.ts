import { IScenario } from "@/domain/entities";
import { ScenarioRepository } from "@/data/protocols/db";
import { GetAllScenarios } from "@/domain/use-cases";

export class DbGetAllScenarios implements GetAllScenarios {
  private scenarioRepository: ScenarioRepository;

  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }

  async execute(projectId: number | string): Promise<IScenario[]> {
    const scenarios = await this.scenarioRepository.getAllScenarios(projectId);
    return scenarios;
  }
}
