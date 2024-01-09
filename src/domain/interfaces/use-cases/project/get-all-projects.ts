import { Project } from "../../../entities/project";

export interface GetAllProjectsUseCase {
    execute(): Promise<Project[]>
}