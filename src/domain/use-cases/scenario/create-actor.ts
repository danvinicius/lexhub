import { CreateActorRequestDTO } from "@/presentation/http/dtos";
import { UseCase } from "../base-use-case";

export interface CreateActor
  extends UseCase<CreateActorRequestDTO, void> {}