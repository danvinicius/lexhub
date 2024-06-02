import { IScenario } from '@/entities';
import { ScenarioRepository } from '@/infra/db/protocols';
import { CreateManyScenariosRequestDTO } from '@/infra/http/dtos';

export class CreateManyScenariosUseCase {
  constructor(
    private scenarioRepository: ScenarioRepository,
  ) {}

  async execute(data: CreateManyScenariosRequestDTO): Promise<IScenario[]> {
    return await this.scenarioRepository.createManyScenarios(data);
  }
}
