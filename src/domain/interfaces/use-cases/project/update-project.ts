import { Project } from "../../../entities/project";

export interface UpdateProjectUseCase {
    execute(id: string, project: Project): Promise<void> 
}