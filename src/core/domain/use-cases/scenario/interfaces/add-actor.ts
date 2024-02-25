import { AddActorRequestDTO } from '../../../../../application/http/dtos/add-actor-request-dto'

export interface AddActorUseCase {
    execute(id: number | string, actor: AddActorRequestDTO): Promise<void>;
}