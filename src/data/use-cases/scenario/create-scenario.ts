import { IScenario } from "@/domain/entities";
import { ScenarioRepository } from "@/data/protocols/db";
import { CreateScenario } from "@/domain/use-cases/scenario";
import { CreateScenarioRequestDTO } from "@/presentation/http/dtos";

export class DbCreateScenario implements CreateScenario {
  private scenarioRepository: ScenarioRepository;

  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }

  async execute(scenario: CreateScenarioRequestDTO): Promise<IScenario> {
    return await this.scenarioRepository.createScenario(scenario);
  }
}
