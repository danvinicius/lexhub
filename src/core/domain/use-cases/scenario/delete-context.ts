import { DeleteContextUseCase } from "./interfaces/delete-context";
import { ScenarioRepository } from '../../../repositories/scenario-repository'

export class DeleteContext implements DeleteContextUseCase {
    private scenarioRepository: ScenarioRepository;
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(id: number | string): Promise<void> {
        return await this.scenarioRepository.deleteContext(id)
    };
}