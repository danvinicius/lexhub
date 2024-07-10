import { AddOrRemoveEntity } from '@/use-cases/scenario';
import { ScenarioRepository } from '@/infra/db/repositories';
import { InvalidParamError } from '@/util/errors';

export class AddActorUseCase {
  constructor(private scenarioRepository: ScenarioRepository) {}
  async execute({ scenarioId, actorId }: AddOrRemoveEntity): Promise<void> {
    const scenarioExists =
      await this.scenarioRepository.getScenario(scenarioId);
    if (!scenarioExists) {
      throw new InvalidParamError('scenarioId');
    }
    return await this.scenarioRepository.addActor(scenarioId, actorId);
  }
}
