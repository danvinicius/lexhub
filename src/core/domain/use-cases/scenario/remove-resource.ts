import { AddOrRemoveEntity, RemoveResourceUseCase } from "./interfaces";
import { ScenarioRepository } from '../../../repositories/scenario-repository'

export class RemoveResource implements RemoveResourceUseCase {
    private scenarioRepository: ScenarioRepository;
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute({resourceId, scenarioId}: AddOrRemoveEntity): Promise<void> {
        return await this.scenarioRepository.removeResource(scenarioId, resourceId)
    };
}