import { AddRestrictionRequestDTO } from '../../../../../application/http/dtos/add-restriction-request-dto'

export interface AddRestrictionUseCase {
    execute(exception: AddRestrictionRequestDTO): Promise<void>;
}