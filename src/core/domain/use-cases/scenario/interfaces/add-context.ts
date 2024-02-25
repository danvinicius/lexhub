import { AddContextRequestDTO } from '../../../../../application/http/dtos/add-context-request-dto'

export interface AddContextUseCase {
    execute(exception: AddContextRequestDTO): Promise<void>;
}