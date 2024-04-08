import { CreateActorRequestDTO } from '@/infra/http/dtos';
import { ScenarioRepository } from '@/protocols/db';
import { InvalidParamError } from '@/util/errors';

export class CreateActorUseCase {
  constructor(private scenarioRepository: ScenarioRepository) {}
  async execute(actor: CreateActorRequestDTO): Promise<void> {
    const scenarioExists = await this.scenarioRepository.getScenario(
      actor.scenarioId
    );
    if (!scenarioExists) {
      throw new InvalidParamError('scenarioId');
    }
    return await this.scenarioRepository.createActor(actor);
  }
}
