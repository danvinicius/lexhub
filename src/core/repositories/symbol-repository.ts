import { AddImpactRequestDTO } from "../../application/http/dtos/add-impact-request-dto";
import { AddSynonymRequestDTO } from "../../application/http/dtos/add-synonym-request-dto";
import { CreateSymbolRequestDTO } from "../../application/http/dtos/create-symbol-request-dto";
import { UpdateSymbolRequestDTO } from "../../application/http/dtos/update-symbol-request-dto";
import { ISymbol } from "../domain/entities/symbol";

export interface SymbolRepository {
  getSymbol(id: string | number): Promise<null | ISymbol>;
  getAllSymbols(projectId: number | string): Promise<ISymbol[]>;
  createSymbol(symbol: CreateSymbolRequestDTO): Promise<ISymbol>;
  updateSymbol(id: string | number, symbol: UpdateSymbolRequestDTO): Promise<void>;
  deleteSymbol(id: string | number): Promise<void>;
  addImpact(data: AddImpactRequestDTO): Promise<void>
  addSynonym(data: AddSynonymRequestDTO): Promise<void>
  removeImpact(id: string | number): Promise<void>
  removeSynonym(id: string | number): Promise<void>
}
