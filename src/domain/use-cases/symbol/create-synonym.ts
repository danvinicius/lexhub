import { CreateSynonymRequestDTO } from "@/presentation/http/dtos";
import { UseCase } from "../base-use-case";

export interface CreateSynonym
  extends UseCase<CreateSynonymRequestDTO, void> {}