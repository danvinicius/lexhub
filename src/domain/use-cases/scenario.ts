import { UseCase } from "@/domain/use-cases/base-use-case";
import * as DTO from "@/presentation/http/dtos";
import { IScenario } from "../entities";

export namespace UpdateScenario {
  export interface Params {
    id: string;
    scenario: DTO.UpdateScenarioRequestDTO;
  }
}

export interface AddOrRemoveEntity {
  [key: string]: number | string;
}

export interface AddActor extends UseCase<AddOrRemoveEntity, void> {}

export interface AddResource extends UseCase<AddOrRemoveEntity, void> {}

export interface CreateActor extends UseCase<DTO.CreateActorRequestDTO, void> {}

export interface CreateContext
  extends UseCase<DTO.CreateContextRequestDTO, void> {}

export interface CreateEpisode
  extends UseCase<DTO.CreateEpisodeRequestDTO, void> {}

export interface CreateException
  extends UseCase<DTO.CreateExceptionRequestDTO, void> {}

export interface CreateManyScenarios
  extends UseCase<DTO.CreateManyScenariosRequestDTO, IScenario[]> {}

export interface CreateResource
  extends UseCase<DTO.CreateResourceRequestDTO, void> {}

export interface CreateRestriction
  extends UseCase<DTO.CreateRestrictionRequestDTO, void> {}

export interface CreateScenario
  extends UseCase<DTO.CreateScenarioRequestDTO, IScenario> {}

export interface DeleteActor extends UseCase<number | string, void> {}

export interface DeleteContext extends UseCase<number | string, void> {}

export interface DeleteEpisode extends UseCase<number | string, void> {}

export interface DeleteException extends UseCase<number | string, void> {}

export interface DeleteGroup extends UseCase<number | string, void> {}

export interface DeleteResource extends UseCase<number | string, void> {}

export interface DeleteRestriction extends UseCase<number | string, void> {}

export interface DeleteScenario extends UseCase<number | string, void> {}

export interface GetScenario
  extends UseCase<number | string, null | IScenario> {}

export interface GetAllScenarios
  extends UseCase<number | string, IScenario[]> {}

export interface RemoveActor extends UseCase<AddOrRemoveEntity, void> {}

export interface RemoveResource extends UseCase<AddOrRemoveEntity, void> {}

export interface UpdateScenario extends UseCase<UpdateScenario.Params, void> {}

export interface FoundLexicon {
  resource: string;
  name: string;
  starts: number;
  ends: number;
  type: string;
}

export interface GetScenarioWithLexicons
  extends UseCase<
    number | string,
    {
      title: {
        content: string;
        foundLexicons: FoundLexicon[];
      };
      goal: {
        content: string;
        foundLexicons: FoundLexicon[];
      };
      context: {
        geographicLocation: {
          content: string;
          foundLexicons: FoundLexicon[];
        };
        temporalLocation: {
          content: string;
          foundLexicons: FoundLexicon[];
        };
        preCondition: {
          content: string;
          foundLexicons: FoundLexicon[];
        };
        restrictions: {
          content: string;
          foundLexicons: FoundLexicon[];
        }[];
      };
      exceptions: {
        content: string;
        foundLexicons: FoundLexicon[];
      }[];
      actors: {
        content: string;
        foundLexicons: FoundLexicon[];
      }[];
      resources: {
        content: string;
        foundLexicons: FoundLexicon[];
      }[];
    }
  > {}
