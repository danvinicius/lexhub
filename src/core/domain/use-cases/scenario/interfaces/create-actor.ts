import { CreateActorRequestDTO } from '../../../../../application/http/dtos/create-actor-request-dto'

export interface CreateActorUseCase {
    execute(exception: CreateActorRequestDTO): Promise<void>;
}