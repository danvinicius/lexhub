import { IProject } from "@/domain/entities";
import * as DTO from "@/presentation/http/dtos";
import { UseCase } from "@/domain/use-cases/base-use-case";

export namespace UpdateProject {
  export interface Params {
    id: string;
    project: DTO.UpdateProjectRequestDTO;
  }
}
export interface CreateProject
  extends UseCase<DTO.CreateProjectRequestDTO, IProject> {}

export interface DeleteProject extends UseCase<number | string, void> {}

export interface GetAllProjects extends UseCase<void, IProject[]> {}

export interface GetProject extends UseCase<number | string, null | IProject> {}

export interface UpdateProject extends UseCase<UpdateProject.Params, void> {}
