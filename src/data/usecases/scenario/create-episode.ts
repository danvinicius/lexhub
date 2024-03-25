import { CreateEpisode } from '@/domain/use-cases/scenario';
import { CreateEpisodeRequestDTO } from '@/presentation/http/dtos';
import { ScenarioRepository } from '@/data/protocols/db';

export class DbCreateEpisode implements CreateEpisode {
    private scenarioRepository: ScenarioRepository
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(episode: CreateEpisodeRequestDTO): Promise<void> {
        return await this.scenarioRepository.createEpisode(episode);
    }
}