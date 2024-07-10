import { AddOrRemoveEntity } from '@/use-cases/scenario/add-remove-entity';
import { ScenarioRepository } from '@/infra/db/repositories';
import { InvalidParamError } from '@/util/errors';

export class RemoveResourceUseCase {
  private scenarioRepository: ScenarioRepository;
  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute({ resourceId, scenarioId }: AddOrRemoveEntity): Promise<void> {
    const scenarioExists =
    await this.scenarioRepository.getScenario(scenarioId);
    if (!scenarioExists) {
      throw new InvalidParamError('scenarioId');
    }
    return await this.scenarioRepository.removeResource(scenarioId, resourceId);
  }
}
