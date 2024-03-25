import { IProject } from "@/domain/entities";
import { CreateProjectRequestDTO } from "@/presentation/http/dtos";
import { UseCase } from "../base-use-case";

export interface CreateProject
  extends UseCase<CreateProjectRequestDTO, IProject> {}