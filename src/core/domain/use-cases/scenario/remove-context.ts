import { RemoveContextUseCase } from "./interfaces/remove-context";
import { ScenarioRepository } from '../../../repositories/scenario-repository'

export class RemoveContext implements RemoveContextUseCase {
    private scenarioRepository: ScenarioRepository;
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(id: number | string): Promise<void> {
        return await this.scenarioRepository.removeContext(id)
    };
}