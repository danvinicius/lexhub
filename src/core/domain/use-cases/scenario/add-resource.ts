import { AddResourceUseCase } from './interfaces/add-resource';
import { ScenarioRepository } from '../../../repositories/scenario-repository';

export class AddResource implements AddResourceUseCase {
    private scenarioRepository: ScenarioRepository
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(scenarioId: number | string, resourceId: number | string): Promise<void> {
        return await this.scenarioRepository.addResource(scenarioId, resourceId);
    }
}