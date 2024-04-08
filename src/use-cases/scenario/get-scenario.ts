import { IScenario } from '@/entities';
import { ScenarioRepository } from '@/protocols/db';
import { NotFoundError } from '@/util/errors';

export class GetScenarioUseCase {
  private scenarioRepository: ScenarioRepository;

  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute(id: number | string): Promise<null | IScenario> {
    const scenario = await this.scenarioRepository.getScenario(id);
    if (!scenario) {
      throw new NotFoundError('Scenario not found');
    }
    return scenario;
  }
}
