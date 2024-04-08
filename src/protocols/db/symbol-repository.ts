import {
  CreateImpactRequestDTO,
  CreateSynonymRequestDTO,
  CreateSymbolRequestDTO,
  UpdateSymbolRequestDTO,
} from "@/infra/http/dtos";
import { ISymbol } from "@/entities/symbol";

export interface SymbolRepository {
  getSymbol(id: number | string): Promise<null | ISymbol>;
  getAllSymbols(projectId: number | string): Promise<ISymbol[]>;
  createSymbol(symbol: CreateSymbolRequestDTO): Promise<ISymbol>;
  updateSymbol(
    id: number | string,
    symbol: UpdateSymbolRequestDTO
  ): Promise<void>;
  deleteSymbol(id: number | string): Promise<void>;
  createImpact(data: CreateImpactRequestDTO): Promise<void>;
  createSynonym(data: CreateSynonymRequestDTO): Promise<void>;
  deleteImpact(id: number | string): Promise<void>;
  deleteSynonym(id: number | string): Promise<void>;
}
