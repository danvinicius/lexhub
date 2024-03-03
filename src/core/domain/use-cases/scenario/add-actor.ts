import { AddActorUseCase, AddOrRemoveEntity } from "./interfaces";
import { ScenarioRepository } from "../../../repositories/scenario-repository";

export class AddActor implements AddActorUseCase {
  private scenarioRepository: ScenarioRepository;
  constructor(scenarioRepository: ScenarioRepository) {
    this.scenarioRepository = scenarioRepository;
  }
  async execute({ scenarioId, actorId }: AddOrRemoveEntity): Promise<void> {
    return await this.scenarioRepository.addActor(scenarioId, actorId);
  }
}
