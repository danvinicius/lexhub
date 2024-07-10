import { ScenarioRepository } from '@/infra/db/repositories';

export class DeleteContextUseCase {
  private scenarioRepository: ScenarioRepository;
  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute(id: number): Promise<void> {
    return await this.scenarioRepository.deleteContext(id);
  }
}
