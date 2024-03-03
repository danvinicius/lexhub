import { DeleteGroupUseCase } from "./interfaces";
import { ScenarioRepository } from '../../../repositories/scenario-repository'

export class DeleteGroup implements DeleteGroupUseCase {
    private scenarioRepository: ScenarioRepository;
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(id: number | string): Promise<void> {
        return await this.scenarioRepository.deleteGroup(id)
    };
}