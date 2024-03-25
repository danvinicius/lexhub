import { AddActor, AddOrRemoveEntity } from "@/domain/use-cases/scenario";
import { ScenarioRepository } from "@/data/protocols/db";

export class DbAddActor implements AddActor {
  private scenarioRepository: ScenarioRepository;
  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute({ scenarioId, actorId }: AddOrRemoveEntity): Promise<void> {
    return await this.scenarioRepository.addActor(scenarioId, actorId);
  }
}
