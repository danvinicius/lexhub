import { DeleteActorUseCase } from "./interfaces/delete-actor";
import { ScenarioRepository } from '../../../repositories/scenario-repository'

export class DeleteActor implements DeleteActorUseCase {
    private scenarioRepository: ScenarioRepository;
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(id: number | string): Promise<void> {
        return await this.scenarioRepository.deleteActor(id)
    };
}