import { AddOrRemoveEntity, AddResource } from "@/domain/use-cases/scenario";
import { ScenarioRepository } from "@/data/protocols/db";

export class DbAddResource implements AddResource {
  private scenarioRepository: ScenarioRepository;
  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute({ scenarioId, resourceId }: AddOrRemoveEntity): Promise<void> {
    return await this.scenarioRepository.addResource(scenarioId, resourceId);
  }
}
