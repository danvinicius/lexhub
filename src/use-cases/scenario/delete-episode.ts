import { ScenarioRepository } from '@/protocols/db'

export class DeleteEpisodeUseCase {
    private scenarioRepository: ScenarioRepository;
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(id: number | string): Promise<void> {
        return await this.scenarioRepository.deleteEpisode(id)
    };
}