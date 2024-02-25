import { IScenario } from "../../entities/scenario";
import { ScenarioRepository } from "../../../repositories/scenario-repository";
import { GetScenarioUseCase } from "./interfaces/get-scenario";

export class GetScenario implements GetScenarioUseCase {
  private scenarioRepository: ScenarioRepository;

  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute(id: number | string): Promise<null | IScenario> {
    const scenario = this.scenarioRepository.getScenario(id);
    return scenario;
  }
}
