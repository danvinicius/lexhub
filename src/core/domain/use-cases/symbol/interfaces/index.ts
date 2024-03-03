import { CreateSymbolRequestDTO } from "../../../../../application/http/dtos/create-symbol-request-dto";
import { UpdateSymbolRequestDTO } from "../../../../../application/http/dtos/update-symbol-request-dto";
import { CreateImpactRequestDTO } from "../../../../../application/http/dtos/create-impact-request-dto";
import { CreateSynonymRequestDTO } from "../../../../../application/http/dtos/create-synonym-request-dto";
import { ISymbol } from "../../../entities/symbol";
import { UseCase } from "../../base-use-case";

export interface UpdateSymbolUseCaseParams {
  id: string;
  symbol: UpdateSymbolRequestDTO;
}

export interface GetSymbolUseCase
  extends UseCase<number | string, null | ISymbol> {}

export interface GetAllSymbolsUseCase extends UseCase<number | string, ISymbol[]> {}

export interface CreateSymbolUseCase
  extends UseCase<CreateSymbolRequestDTO, ISymbol> {}

export interface UpdateSymbolUseCase
  extends UseCase<UpdateSymbolUseCaseParams, void> {}

export interface DeleteSymbolUseCase extends UseCase<number | string, void> {}

export interface CreateImpactUseCase
  extends UseCase<CreateImpactRequestDTO, void> {}

export interface CreateSynonymUseCase
  extends UseCase<CreateSynonymRequestDTO, void> {}

export interface DeleteImpactUseCase extends UseCase<number | string, void> {}

export interface DeleteSynonymUseCase extends UseCase<number | string, void> {}
