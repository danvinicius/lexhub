import { UpdateProjectRequestDTO } from "../../../domain/dto/update-project-request-dto";

export interface UpdateProjectUseCase {
    execute(id: string | number, project: UpdateProjectRequestDTO): Promise<void> 
}