import { CreateSymbolRequestDTO } from "../../domain/dto/create-symbol-request-dto";
import { UpdateSymbolRequestDTO } from "../../domain/dto/update-symbol-request-dto";
import { ISymbol } from "../../domain/entities/symbol";

export interface SymbolRepository {
  getSymbol(id: string | number): Promise<null | ISymbol>;
  getAllSymbols(): Promise<ISymbol[]>;
  createSymbol(symbol: CreateSymbolRequestDTO): Promise<ISymbol>;
  updateSymbol(id: string | number, symbol: UpdateSymbolRequestDTO): Promise<void>;
  deleteSymbol(id: string | number): Promise<void>;
}
