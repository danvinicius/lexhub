import { IScenario } from "../../entities/scenario";
import { ScenarioRepository } from "../../../repositories/scenario-repository";
import { CreateScenarioUseCase } from "./interfaces/create-scenario";
import { CreateScenarioRequestDTO } from "../../../../application/http/dtos/create-scenario-request-dto";

export class CreateScenario implements CreateScenarioUseCase {
  private scenarioRepository: ScenarioRepository;

  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }

  async execute(scenario: CreateScenarioRequestDTO): Promise<IScenario> {
    return await this.scenarioRepository.createScenario(scenario);
  }
}
