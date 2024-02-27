import { AddActorUseCase } from './interfaces/add-actor';
import { ScenarioRepository } from '../../../repositories/scenario-repository';

export class AddActor implements AddActorUseCase {
    private scenarioRepository: ScenarioRepository
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(scenarioId: number | string, actorId: number | string): Promise<void> {
        return await this.scenarioRepository.addActor(scenarioId, actorId);
    }
}