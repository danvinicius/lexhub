import { ScenarioRepository } from '@/infra/db/repositories';

export class DeleteEpisodeUseCase {
  private scenarioRepository: ScenarioRepository;
  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute(id: number): Promise<void> {
    return await this.scenarioRepository.deleteEpisode(id);
  }
}
