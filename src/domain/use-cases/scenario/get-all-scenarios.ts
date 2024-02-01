import { Scenario } from "../../entities/scenario";
import { ScenarioRepository } from "../../../interfaces/repositories/scenario-repository";
import { GetAllScenariosUseCase } from "../../../interfaces/use-cases/scenario/get-all-scenarios";

export class GetAllScenarios implements GetAllScenariosUseCase {
  private scenarioRepository: ScenarioRepository;

  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }

  async execute(): Promise<Scenario[]> {
    const scenarios = await this.scenarioRepository.getAllScenarios();
    return scenarios;
  }
}
