import { CreateEpisodeRequestDTO } from '../../../../../application/http/dtos/create-episode.request-dto'

export interface CreateEpisodeUseCase {
    execute(exception: CreateEpisodeRequestDTO): Promise<void>;
}