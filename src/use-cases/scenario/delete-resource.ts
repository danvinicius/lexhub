import { ScenarioRepository } from '@/infra/db/repositories';

export class DeleteResourceUseCase {
  private scenarioRepository: ScenarioRepository;
  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute(id: number): Promise<void> {
    return await this.scenarioRepository.deleteResource(id);
  }
}
