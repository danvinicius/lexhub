import { AddOrRemoveEntity, AddResourceUseCase } from "./interfaces";
import { ScenarioRepository } from "../../../repositories/scenario-repository";

export class AddResource implements AddResourceUseCase {
  private scenarioRepository: ScenarioRepository;
  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute({ scenarioId, resourceId }: AddOrRemoveEntity): Promise<void> {
    return await this.scenarioRepository.addResource(scenarioId, resourceId);
  }
}
