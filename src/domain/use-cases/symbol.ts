import { UseCase } from "@/domain/use-cases/base-use-case";
import * as DTO from "@/presentation/http/dtos";
import { ISymbol } from "@/domain/entities";

export namespace UpdateSymbol {
  export interface Params {
    id: string;
    symbol: DTO.UpdateSymbolRequestDTO;
  }
}
export interface CreateImpact
  extends UseCase<DTO.CreateImpactRequestDTO, void> {}

export interface CreateSymbol
  extends UseCase<DTO.CreateSymbolRequestDTO, ISymbol> {}

export interface CreateSynonym
  extends UseCase<DTO.CreateSynonymRequestDTO, void> {}

export interface DeleteImpact extends UseCase<number | string, void> {}

export interface DeleteSymbol extends UseCase<number | string, void> {}

export interface DeleteSynonym extends UseCase<number | string, void> {}

export interface GetAllSymbols extends UseCase<number | string, ISymbol[]> {}

export interface GetSymbol extends UseCase<number | string, null | ISymbol> {}

export interface UpdateSymbol extends UseCase<UpdateSymbol.Params, void> {}
