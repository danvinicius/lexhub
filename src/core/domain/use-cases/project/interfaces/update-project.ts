import { UpdateProjectRequestDTO } from "../../../../../application/dtos/update-project-request-dto";

export interface UpdateProjectUseCase {
    execute(id: string | number, project: UpdateProjectRequestDTO): Promise<void> 
}