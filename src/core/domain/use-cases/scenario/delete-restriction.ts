import { DeleteRestrictionUseCase } from "./interfaces";
import { ScenarioRepository } from '../../../repositories/scenario-repository'

export class DeleteRestriction implements DeleteRestrictionUseCase {
    private scenarioRepository: ScenarioRepository;
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(id: number | string): Promise<void> {
        return await this.scenarioRepository.deleteRestriction(id)
    };
}