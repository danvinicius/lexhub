import { CreateProjectRequestDTO } from "../../../../../application/http/dtos/create-project-request-dto";
import { IProject } from "../../../entities/project";

export interface CreateProjectUseCase {
    execute(project: CreateProjectRequestDTO): Promise<IProject>
}