import { IScenario } from "@/domain/entities";
import { UseCase } from "../base-use-case";

export interface GetAllScenarios
  extends UseCase<number | string, IScenario[]> {}