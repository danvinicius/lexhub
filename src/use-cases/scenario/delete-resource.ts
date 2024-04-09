import { ScenarioRepository } from '@/infra/db/protocols';

export class DeleteResourceUseCase {
  private scenarioRepository: ScenarioRepository;
  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute(id: number | string): Promise<void> {
    return await this.scenarioRepository.deleteResource(id);
  }
}
