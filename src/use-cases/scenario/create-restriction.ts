import { IEpisode, IResource } from '@/entities';
import { CreateRestrictionRequestDTO } from '@/infra/http/dtos';
import { ScenarioRepository } from '@/protocols/db';
import { InvalidParamError } from '@/util/errors';

export class CreateRestrictionUseCase {
  private scenarioRepository: ScenarioRepository;
  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute(context: CreateRestrictionRequestDTO): Promise<void> {
    const scenarioExists = await this.scenarioRepository.getScenario(
      context.scenarioId
    );
    if (!scenarioExists) {
      throw new InvalidParamError('scenarioId');
    }
    const resource = scenarioExists.resources?.find(
      (r: IResource) => r.id == context?.resourceId
    );
    const episode = scenarioExists.episodes?.find(
      (r: IEpisode) => r.id == context?.episodeId
    );
    if (context.resourceId && !resource) {
      throw new InvalidParamError('resourceId');
    }
    if (context.episodeId && !episode) {
      throw new InvalidParamError('episodeId');
    }
    return await this.scenarioRepository.createRestriction(context);
  }
}
