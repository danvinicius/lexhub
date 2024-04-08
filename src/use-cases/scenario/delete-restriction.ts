import { ScenarioRepository } from '@/protocols/db';

export class DeleteRestrictionUseCase {
  private scenarioRepository: ScenarioRepository;
  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute(id: number | string): Promise<void> {
    return await this.scenarioRepository.deleteRestriction(id);
  }
}
