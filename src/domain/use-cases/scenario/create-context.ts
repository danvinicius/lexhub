import { CreateContextRequestDTO } from "@/presentation/http/dtos";
import { UseCase } from "../base-use-case";

export interface CreateContext
  extends UseCase<CreateContextRequestDTO, void> {}