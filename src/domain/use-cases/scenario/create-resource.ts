import { CreateResourceRequestDTO } from "@/presentation/http/dtos";
import { UseCase } from "../base-use-case";

export interface CreateResource
  extends UseCase<CreateResourceRequestDTO, void> {}