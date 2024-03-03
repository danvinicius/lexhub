import { AddOrRemoveEntity, RemoveActorUseCase } from "./interfaces";
import { ScenarioRepository } from '../../../repositories/scenario-repository'

export class RemoveActor implements RemoveActorUseCase {
    private scenarioRepository: ScenarioRepository;
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute({actorId, scenarioId}: AddOrRemoveEntity): Promise<void> {
        return await this.scenarioRepository.removeActor(scenarioId, actorId)
    };
}