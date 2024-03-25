import { CreateRestrictionRequestDTO } from "@/presentation/http/dtos";
import { UseCase } from "../base-use-case";

export interface CreateRestriction
  extends UseCase<CreateRestrictionRequestDTO, void> {}