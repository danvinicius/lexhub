import { CreateResourceRequestDTO } from '@/infra/http/dtos';
import { ScenarioRepository } from '@/protocols/db';
import { InvalidParamError } from '@/util/errors';

export class CreateResourceUseCase {
  private scenarioRepository: ScenarioRepository;
  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute(resource: CreateResourceRequestDTO): Promise<void> {
    const scenarioExists = await this.scenarioRepository.getScenario(
      resource.scenarioId
    );
    if (!scenarioExists) {
      throw new InvalidParamError('scenarioId');
    }
    return await this.scenarioRepository.createResource(resource);
  }
}
