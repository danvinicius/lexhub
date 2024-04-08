import { CreateContextRequestDTO } from "@/infra/http/dtos";
import { ScenarioRepository } from "@/protocols/db";
import { InvalidParamError } from "@/util/errors";

export class CreateContextUseCase {
  private scenarioRepository: ScenarioRepository;
  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute(context: CreateContextRequestDTO): Promise<void> {
    const scenarioExists = await this.scenarioRepository.getScenario(
      context.scenarioId
    );
    if (!scenarioExists) {
      throw new InvalidParamError("scenarioId");
    }
    return await this.scenarioRepository.createContext(context);
  }
}
