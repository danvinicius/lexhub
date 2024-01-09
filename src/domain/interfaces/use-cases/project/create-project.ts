import { Project } from "../../../entities/project";

export interface CreateProjectUseCase {
    execute(project: Project): Promise<void>
}