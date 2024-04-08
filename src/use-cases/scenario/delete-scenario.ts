import { ScenarioRepository } from '@/protocols/db';
import { InvalidParamError } from '@/util/errors';

export class DeleteScenarioUseCase {
  private scenarioRepository: ScenarioRepository;

  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }

  async execute(id: string): Promise<void> {
    const scenarioExists = await this.scenarioRepository.getScenario(id);
    if (!scenarioExists) {
      throw new InvalidParamError('scenarioId');
    }
    await this.scenarioRepository.deleteScenario(id);
  }
}
