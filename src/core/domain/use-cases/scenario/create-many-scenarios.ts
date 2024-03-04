import { IScenario } from "../../entities/scenario";
import { ScenarioRepository } from "../../../repositories/scenario-repository";
import { CreateManyScenariosUseCase } from "./interfaces";
import { CreateManyScenariosRequestDTO } from "../../../../application/http/dtos/create-many-scenarios-request-dto";

export class CreateManyScenarios implements CreateManyScenariosUseCase {
  private scenarioRepository: ScenarioRepository;

  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }

  async execute(data: CreateManyScenariosRequestDTO): Promise<IScenario[]> {
    return await this.scenarioRepository.createManyScenarios(data);
  }
}
