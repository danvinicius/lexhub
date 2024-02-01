import { Project } from "../../../domain/entities/project";

export interface GetAllProjectsUseCase {
    execute(): Promise<Project[]>
}