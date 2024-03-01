import { DeleteResourceUseCase } from "./interfaces/delete-resource";
import { ScenarioRepository } from '../../../repositories/scenario-repository'

export class DeleteResource implements DeleteResourceUseCase {
    private scenarioRepository: ScenarioRepository;
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(id: number | string): Promise<void> {
        return await this.scenarioRepository.deleteResource(id)
    };
}