import { CreateExceptionRequestDTO } from "@/infra/http/dtos";
import { ScenarioRepository } from "@/protocols/db";
import { InvalidParamError } from "@/util/errors";

export class CreateExceptionUseCase {
  private scenarioRepository: ScenarioRepository;
  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute(exception: CreateExceptionRequestDTO): Promise<void> {
    const scenarioExists = await this.scenarioRepository.getScenario(
      exception.scenarioId
    );
    if (!scenarioExists) {
      throw new InvalidParamError("scenarioId");
    }
    return await this.scenarioRepository.createException(exception);
  }
}
