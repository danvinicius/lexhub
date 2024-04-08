import { IScenario } from "@/entities";
import { ProjectRepository, ScenarioRepository } from "@/protocols/db";
import { CreateScenarioRequestDTO } from "@/infra/http/dtos";
import { InvalidParamError } from "@/util/errors";

export class CreateScenarioUseCase {
  constructor(
    private scenarioRepository: ScenarioRepository,
    private projectRepository: ProjectRepository
  ) {}

  async execute(scenario: CreateScenarioRequestDTO): Promise<IScenario> {
    const projectExists = await this.projectRepository.getProject(scenario.projectId)
    if (!projectExists) {
      throw new InvalidParamError('projectId')
    }
    return await this.scenarioRepository.createScenario(scenario);
  }
}
