import { CreateImpactRequestDTO } from "../../application/http/dtos/create-impact-request-dto";
import { CreateSynonymRequestDTO } from "../../application/http/dtos/create-synonym-request-dto";
import { CreateSymbolRequestDTO } from "../../application/http/dtos/create-symbol-request-dto";
import { UpdateSymbolRequestDTO } from "../../application/http/dtos/update-symbol-request-dto";
import { ISymbol } from "../domain/entities/symbol";

export interface SymbolRepository {
  getSymbol(id: number | string): Promise<null | ISymbol>;
  getAllSymbols(projectId: number | string): Promise<ISymbol[]>;
  createSymbol(symbol: CreateSymbolRequestDTO): Promise<ISymbol>;
  updateSymbol(id: number | string, symbol: UpdateSymbolRequestDTO): Promise<void>;
  deleteSymbol(id: number | string): Promise<void>;
  createImpact(data: CreateImpactRequestDTO): Promise<void>
  createSynonym(data: CreateSynonymRequestDTO): Promise<void>
  deleteImpact(id: number | string): Promise<void>
  deleteSynonym(id: number | string): Promise<void>
}
