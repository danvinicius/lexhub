import { RemoveResourceUseCase } from "./interfaces/remove-resource";
import { ScenarioRepository } from '../../../repositories/scenario-repository'

export class RemoveResource implements RemoveResourceUseCase {
    private scenarioRepository: ScenarioRepository;
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(resourceId: number | string, scenarioId: number | string): Promise<void> {
        return await this.scenarioRepository.removeResource(resourceId, scenarioId)
    };
}