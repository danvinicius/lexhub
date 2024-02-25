import { RemoveExceptionUseCase } from "./interfaces/remove-exception";
import { ScenarioRepository } from '../../../repositories/scenario-repository'

export class RemoveException implements RemoveExceptionUseCase {
    private scenarioRepository: ScenarioRepository;
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(id: number | string): Promise<void> {
        return await this.scenarioRepository.removeException(id)
    };
}