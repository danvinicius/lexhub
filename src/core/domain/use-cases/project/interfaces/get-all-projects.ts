import { IProject } from "../../../entities/project";

export interface GetAllProjectsUseCase {
    execute(): Promise<IProject[]>
}