import { IProject } from "../../../entities/project";

export interface GetProjectUseCase {
    execute(id: number | string): Promise<null | IProject>
}