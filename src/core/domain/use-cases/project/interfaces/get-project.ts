import { IProject } from "../../../entities/project";

export interface GetProjectUseCase {
    execute(id: string | number): Promise<null | IProject>
}