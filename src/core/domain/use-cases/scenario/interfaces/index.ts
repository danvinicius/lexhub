import { CreateScenarioRequestDTO } from "../../../../../application/http/dtos/create-scenario-request-dto";
import { UpdateScenarioRequestDTO } from "../../../../../application/http/dtos/update-scenario-request-dto";
import { CreateActorRequestDTO } from "../../../../../application/http/dtos/create-actor-request-dto";
import { CreateContextRequestDTO } from "../../../../../application/http/dtos/create-context-request-dto";
import { IScenario } from "../../../entities/scenario";
import { UseCase } from "../../base-use-case";
import { CreateEpisodeRequestDTO } from "../../../../../application/http/dtos/create-episode.request-dto";
import { CreateExceptionRequestDTO } from "../../../../../application/http/dtos/create-exception-request-dto";
import { CreateResourceRequestDTO } from "../../../../../application/http/dtos/create-resource-request-dto";
import { CreateRestrictionRequestDTO } from "../../../../../application/http/dtos/create-restriction-request-dto";

export interface UpdateScenarioUseCaseParams {
  id: string;
  scenario: UpdateScenarioRequestDTO;
}

export interface AddOrRemoveEntity {
  [key: string]: number | string;
}

export interface GetScenarioUseCase
  extends UseCase<number | string, null | IScenario> {}

export interface GetAllScenariosUseCase
  extends UseCase<number | string, IScenario[]> {}

export interface CreateScenarioUseCase
  extends UseCase<CreateScenarioRequestDTO, IScenario> {}

export interface UpdateScenarioUseCase
  extends UseCase<UpdateScenarioUseCaseParams, void> {}

export interface DeleteScenarioUseCase extends UseCase<number | string, void> {}

export interface CreateActorUseCase
  extends UseCase<CreateActorRequestDTO, void> {}

export interface CreateContextUseCase
  extends UseCase<CreateContextRequestDTO, void> {}

export interface CreateEpisodeUseCase
  extends UseCase<CreateEpisodeRequestDTO, void> {}

export interface CreateExceptionUseCase
  extends UseCase<CreateExceptionRequestDTO, void> {}

export interface CreateResourceUseCase
  extends UseCase<CreateResourceRequestDTO, void> {}

export interface CreateRestrictionUseCase
  extends UseCase<CreateRestrictionRequestDTO, void> {}

export interface DeleteActorUseCase extends UseCase<number | string, void> {}

export interface DeleteContextUseCase extends UseCase<number | string, void> {}

export interface DeleteEpisodeUseCase extends UseCase<number | string, void> {}

export interface DeleteExceptionUseCase
  extends UseCase<number | string, void> {}

export interface DeleteGroupUseCase extends UseCase<number | string, void> {}

export interface DeleteResourceUseCase extends UseCase<number | string, void> {}

export interface DeleteRestrictionUseCase
  extends UseCase<number | string, void> {}

export interface AddActorUseCase extends UseCase<AddOrRemoveEntity, void> {}

export interface AddResourceUseCase extends UseCase<AddOrRemoveEntity, void> {}

export interface RemoveActorUseCase extends UseCase<AddOrRemoveEntity, void> {}

export interface RemoveResourceUseCase
  extends UseCase<AddOrRemoveEntity, void> {}

export interface FoundLexicon {
  resource: string;
  name: string;
  starts: number;
  ends: number;
  type: string;
}

export interface GetScenarioWithLexiconsUseCase
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
