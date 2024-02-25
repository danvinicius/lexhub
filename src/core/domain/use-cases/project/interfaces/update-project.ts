import { UpdateProjectRequestDTO } from "../../../../../application/http/dtos/update-project-request-dto";

export interface UpdateProjectUseCase {
    execute(id: number | string, project: UpdateProjectRequestDTO): Promise<void> 
}