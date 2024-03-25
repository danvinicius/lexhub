import { CreateImpactRequestDTO } from "@/presentation/http/dtos";
import { UseCase } from "../base-use-case";

export interface CreateImpact
  extends UseCase<CreateImpactRequestDTO, void> {}