import { UpdateSymbolRequestDTO } from "@/presentation/http/dtos";
import { UseCase } from "../base-use-case";

export interface UpdateSymbol extends UseCase<UpdateSymbol.Params, void> {}

export namespace UpdateSymbol {
  export interface Params {
    id: string;
    symbol: UpdateSymbolRequestDTO;
  }
}
