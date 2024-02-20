import { UpdateProjectRequestDTO } from "../../../../../application/http/dtos/update-project-request-dto";

export interface UpdateProjectUseCase {
    execute(id: string | number, project: UpdateProjectRequestDTO): Promise<void> 
}