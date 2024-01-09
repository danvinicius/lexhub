import { Project } from "../../../entities/project";

export interface UpdateProjectUseCase {
    execute(id: string, data: Project): Promise<void> 
}