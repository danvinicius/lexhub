import { IScenario } from "../../entities/scenario";
import { ScenarioRepository } from "../../../interfaces/repositories/scenario-repository";
import { GetScenarioUseCase } from "../../../interfaces/use-cases/scenario/get-scenario";

export class GetScenario implements GetScenarioUseCase {
  private scenarioRepository: ScenarioRepository;

  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute(id: string | number): Promise<null | IScenario> {
    const scenario = this.scenarioRepository.getScenario(id);
    return scenario;
  }
}
