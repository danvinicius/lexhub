import { CreateRestrictionRequestDTO } from '../../../../../application/http/dtos/create-restriction-request-dto'

export interface CreateRestrictionUseCase {
    execute(exception: CreateRestrictionRequestDTO): Promise<void>;
}