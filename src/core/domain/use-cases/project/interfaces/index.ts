import { CreateProjectRequestDTO } from "../../../../../application/http/dtos/create-project-request-dto";
import { UpdateProjectRequestDTO } from "../../../../../application/http/dtos/update-project-request-dto";
import { IProject } from "../../../entities/project";
import { UseCase } from "../../base-use-case";

export interface UpdateProjectUseCaseParams {
  id: string;
  project: UpdateProjectRequestDTO;
}
export interface GetProjectUseCase
  extends UseCase<number | string, null | IProject> {}

export interface GetAllProjectsUseCase extends UseCase<void, IProject[]> {}

export interface CreateProjectUseCase
  extends UseCase<CreateProjectRequestDTO, IProject> {}

export interface UpdateProjectUseCase
  extends UseCase<UpdateProjectUseCaseParams, void> {}

export interface DeleteProjectUseCase extends UseCase<number | string, void> {}
