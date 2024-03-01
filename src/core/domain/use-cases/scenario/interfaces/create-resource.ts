import { CreateResourceRequestDTO } from '../../../../../application/http/dtos/create-resource-request-dto'

export interface CreateResourceUseCase {
    execute(exception: CreateResourceRequestDTO): Promise<void>;
}