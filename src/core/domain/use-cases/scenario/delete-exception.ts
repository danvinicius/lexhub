import { DeleteExceptionUseCase } from "./interfaces";
import { ScenarioRepository } from '../../../repositories/scenario-repository'

export class DeleteException implements DeleteExceptionUseCase {
    private scenarioRepository: ScenarioRepository;
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(id: number | string): Promise<void> {
        return await this.scenarioRepository.deleteException(id)
    };
}