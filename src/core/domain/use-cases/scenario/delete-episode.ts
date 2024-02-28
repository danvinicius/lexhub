import { DeleteEpisodeUseCase } from "./interfaces/delete-episode";
import { ScenarioRepository } from '../../../repositories/scenario-repository'

export class DeleteEpisode implements DeleteEpisodeUseCase {
    private scenarioRepository: ScenarioRepository;
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(id: number | string): Promise<void> {
        return await this.scenarioRepository.deleteEpisode(id)
    };
}