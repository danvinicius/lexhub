import { UpdateScenarioRequestDTO } from "@/presentation/http/dtos";
import { UseCase } from "../base-use-case";
export interface UpdateScenario extends UseCase<UpdateScenario.Params, void> {}

export namespace UpdateScenario {
  export interface Params {
    id: string;
    scenario: UpdateScenarioRequestDTO;
  }
}
