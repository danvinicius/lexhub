import { Project } from "../../../domain/entities/project";

export interface UpdateProjectUseCase {
    execute(id: string | number, project: Project): Promise<void> 
}