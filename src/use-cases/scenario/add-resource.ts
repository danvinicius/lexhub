import { ScenarioRepository } from '@/protocols/db';
import { AddOrRemoveEntity } from '@/use-cases/scenario/add-remove-entity';
import { InvalidParamError } from '@/util/errors';

export class AddResourceUseCase {
  private scenarioRepository: ScenarioRepository;
  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute({ scenarioId, resourceId }: AddOrRemoveEntity): Promise<void> {
    const scenarioExists =
      await this.scenarioRepository.getScenario(scenarioId);
    if (!scenarioExists) {
      throw new InvalidParamError('scenarioId');
    }
    return await this.scenarioRepository.addResource(scenarioId, resourceId);
  }
}
