import { ScenarioRepository } from "../../../repositories/scenario-repository";
import {
  UpdateScenarioUseCase,
  UpdateScenarioUseCaseParams,
} from "./interfaces";

export class UpdateScenario implements UpdateScenarioUseCase {
  private scenarioRepository: ScenarioRepository;

  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute({ id, scenario }: UpdateScenarioUseCaseParams): Promise<void> {
    return await this.scenarioRepository.updateScenario(id, scenario);
  }
}
