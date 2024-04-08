import { UpdateScenarioRequestDTO } from '@/infra/http/dtos';
import { ScenarioRepository } from '@/protocols/db';
import { InvalidParamError } from '@/util/errors';

export namespace UpdateScenarioUseCase {
  export interface Params {
    id: number | string;
    scenario: UpdateScenarioRequestDTO;
  }
}

export class UpdateScenarioUseCase {
  private scenarioRepository: ScenarioRepository;

  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute({ id, scenario }: UpdateScenarioUseCase.Params): Promise<void> {
    const scenarioExists = await this.scenarioRepository.getScenario(id);
    if (!scenarioExists) {
      throw new InvalidParamError('scenarioId');
    }
    return await this.scenarioRepository.updateScenario(id, scenario);
  }
}
