import { CreateEpisodeUseCase } from './interfaces/create-episode';
import { CreateEpisodeRequestDTO } from '../../../../application/http/dtos/create-episode.request-dto';
import { ScenarioRepository } from '../../../repositories/scenario-repository';

export class CreateEpisode implements CreateEpisodeUseCase {
    private scenarioRepository: ScenarioRepository
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(episode: CreateEpisodeRequestDTO): Promise<void> {
        return await this.scenarioRepository.createEpisode(episode);
    }
}