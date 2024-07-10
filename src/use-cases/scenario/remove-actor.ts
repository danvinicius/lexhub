import { AddOrRemoveEntity } from '@/use-cases/scenario';
import { ScenarioRepository } from '@/infra/db/repositories';
import { InvalidParamError } from '@/util/errors';

export class RemoveActorUseCase {
  private scenarioRepository: ScenarioRepository;
  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute({ actorId, scenarioId }: AddOrRemoveEntity): Promise<void> {
    const scenarioExists =
      await this.scenarioRepository.getScenario(scenarioId);
    if (!scenarioExists) {
      throw new InvalidParamError('scenarioId');
    }
    return await this.scenarioRepository.removeActor(scenarioId, actorId);
  }
}
