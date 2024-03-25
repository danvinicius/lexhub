import { UpdateProjectRequestDTO } from "@/presentation/http/dtos";
import { UseCase } from "../base-use-case";

export interface UpdateProject
  extends UseCase<UpdateProject.Params, void> {}

export namespace UpdateProject {
  export interface Params {
    id: string;
    project: UpdateProjectRequestDTO;
  }
}
