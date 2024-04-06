import { AddOrRemoveEntity, RemoveActor } from "@/domain/use-cases/scenario";
import { ScenarioRepository } from '@/data/protocols/db'

export class DbRemoveActor implements RemoveActor {
    private scenarioRepository: ScenarioRepository;
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute({actorId, scenarioId}: AddOrRemoveEntity): Promise<void> {
        return await this.scenarioRepository.removeActor(scenarioId, actorId)
    };
}