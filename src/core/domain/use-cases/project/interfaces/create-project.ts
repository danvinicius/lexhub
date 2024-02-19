import { CreateProjectRequestDTO } from "../../../../../application/dtos/create-project-request-dto";
import { IProject } from "../../../entities/project";

export interface CreateProjectUseCase {
    execute(project: CreateProjectRequestDTO): Promise<IProject>
}