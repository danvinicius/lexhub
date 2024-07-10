import { IScenario } from '@/entities';
import { ScenarioRepository } from '@/infra/db/repositories';
import { CreateScenarioRequestDTO } from '@/infra/http/dtos';

export class CreateScenarioUseCase {
  constructor(
    private scenarioRepository: ScenarioRepository
  ) {}

  async execute(scenario: CreateScenarioRequestDTO): Promise<IScenario> {
    return await this.scenarioRepository.createScenario(scenario);
  }
}
