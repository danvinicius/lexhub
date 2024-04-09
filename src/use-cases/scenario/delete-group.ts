import { ScenarioRepository } from '@/infra/db/protocols';

export class DeleteGroupUseCase {
  private scenarioRepository: ScenarioRepository;
  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute(id: number | string): Promise<void> {
    return await this.scenarioRepository.deleteGroup(id);
  }
}
