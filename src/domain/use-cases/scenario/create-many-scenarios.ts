import { IScenario } from "@/domain/entities";
import { CreateManyScenariosRequestDTO } from "@/presentation/http/dtos";
import { UseCase } from "../base-use-case";

export interface CreateManyScenarios
  extends UseCase<CreateManyScenariosRequestDTO, IScenario[]> {}