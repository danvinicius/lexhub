import { CreateExceptionRequestDTO } from "@/presentation/http/dtos";
import { UseCase } from "../base-use-case";

export interface CreateException
  extends UseCase<CreateExceptionRequestDTO, void> {}