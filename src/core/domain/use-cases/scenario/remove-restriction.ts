import { RemoveRestrictionUseCase } from "./interfaces/remove-restriction";
import { ScenarioRepository } from '../../../repositories/scenario-repository'

export class RemoveRestriction implements RemoveRestrictionUseCase {
    private scenarioRepository: ScenarioRepository;
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(id: number | string): Promise<void> {
        return await this.scenarioRepository.removeRestriction(id)
    };
}