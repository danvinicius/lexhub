import { CreateEpisodeRequestDTO } from '@/infra/http/dtos';
import { ScenarioRepository } from '@/protocols/db';
import { InvalidParamError } from '@/util/errors';

export class CreateEpisodeUseCase {
  private scenarioRepository: ScenarioRepository;
  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute(episode: CreateEpisodeRequestDTO): Promise<void> {
    const scenarioExists = await this.scenarioRepository.getScenario(
      episode.scenarioId
    );
    if (!scenarioExists) {
      throw new InvalidParamError('scenarioId');
    }
    return await this.scenarioRepository.createEpisode(episode);
  }
}
