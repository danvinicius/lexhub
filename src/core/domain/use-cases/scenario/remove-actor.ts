import { RemoveActorUseCase } from "./interfaces/remove-actor";
import { ScenarioRepository } from '../../../repositories/scenario-repository'

export class RemoveActor implements RemoveActorUseCase {
    private scenarioRepository: ScenarioRepository;
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(actorId: number | string, scenarioId: number | string): Promise<void> {
        return await this.scenarioRepository.removeActor(actorId, scenarioId)
    };
}