import { IScenario } from "../../entities/scenario";
import { ScenarioRepository } from "../../../repositories/scenario-repository";
import { GetAllScenariosUseCase } from "./interfaces/get-all-scenarios";

export class GetAllScenarios implements GetAllScenariosUseCase {
  private scenarioRepository: ScenarioRepository;

  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }

  async execute(projectId: number | string): Promise<IScenario[]> {
    const scenarios = await this.scenarioRepository.getAllScenarios(projectId);
    return scenarios;
  }
}
