import { IScenario } from "@/domain/entities";
import { CreateScenarioRequestDTO } from "@/presentation/http/dtos";
import { UseCase } from "../base-use-case";

export interface CreateScenario
  extends UseCase<CreateScenarioRequestDTO, IScenario> {}