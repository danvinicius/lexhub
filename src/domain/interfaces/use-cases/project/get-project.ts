import { Project } from "../../../entities/project";

export interface GetProjectUseCase {
    execute(id: string | number): Promise<null | Project>
}