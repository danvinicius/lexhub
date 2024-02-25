import { CreateContextRequestDTO } from '../../../../../application/http/dtos/create-context-request-dto'

export interface CreateContextUseCase {
    execute(exception: CreateContextRequestDTO): Promise<void>;
}