import { IScenario } from "@/domain/entities";
import { UseCase } from "../base-use-case";

export interface GetScenario
  extends UseCase<number | string, null | IScenario> {}