import { AddExceptionRequestDTO } from '../../../../../application/http/dtos/add-exception-request-dto'

export interface AddExceptionUseCase {
    execute(exception: AddExceptionRequestDTO): Promise<void>;
}