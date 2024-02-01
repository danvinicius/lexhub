import { IProject } from "../../../domain/entities/project";

export interface GetProjectUseCase {
    execute(id: string | number): Promise<null | IProject>
}