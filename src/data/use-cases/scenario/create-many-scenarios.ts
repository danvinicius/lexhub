import { IScenario } from "@/domain/entities";
import { ScenarioRepository } from "@/data/protocols/db";
import { CreateManyScenarios } from "@/domain/use-cases/scenario";
import { CreateManyScenariosRequestDTO } from "@/presentation/http/dtos";

export class DbCreateManyScenarios implements CreateManyScenarios {
  private scenarioRepository: ScenarioRepository;

  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }

  async execute(data: CreateManyScenariosRequestDTO): Promise<IScenario[]> {
    return await this.scenarioRepository.createManyScenarios(data);
  }
}
