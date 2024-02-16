import { IScenario } from "../../entities/scenario";
import { ProjectRepository } from "../../../interfaces/repositories/project-repository";
import { ScenarioRepository } from "../../../interfaces/repositories/scenario-repository";
import { UpdateScenarioUseCase } from "../../../interfaces/use-cases/scenario/update-scenario";
import { UpdateScenarioRequestDTO } from "../../dto/update-scenario-request-dto";

export class UpdateScenario implements UpdateScenarioUseCase {
  private scenarioRepository: ScenarioRepository;
  private projectRepository: ProjectRepository;

  constructor(
    scenarioRepository: ScenarioRepository
  ) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute(id: number | string, scenario: UpdateScenarioRequestDTO): Promise<void> {
    return await this.scenarioRepository.updateScenario(
      id,
      scenario
    );
  }
}
