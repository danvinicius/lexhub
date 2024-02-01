import { ProjectRequestDTO } from "../../../domain/dto/create-project-request-dto";
import { IProject } from "../../../domain/entities/project";

export interface CreateProjectUseCase {
    execute(project: ProjectRequestDTO): Promise<IProject>
}