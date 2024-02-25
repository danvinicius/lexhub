import { CreateExceptionRequestDTO } from '../../../../../application/http/dtos/create-exception-request-dto'

export interface CreateExceptionUseCase {
    execute(exception: CreateExceptionRequestDTO): Promise<void>;
}