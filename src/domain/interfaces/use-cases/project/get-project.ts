import { Project } from "../../../entities/project";

export interface GetProjectUseCase {
    execute(id: string): Promise<null | Project>
}