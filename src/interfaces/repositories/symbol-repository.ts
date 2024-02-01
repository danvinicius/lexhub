import { SymbolRequestDTO } from "../../../domain/dto/symbol-request-dto";
import { ISymbol } from "../../../domain/entities/symbol";

export interface SymbolRepository {
  getSymbol(id: string | number): Promise<null | ISymbol>;
  getAllSymbols(): Promise<ISymbol[]>;
  createSymbol(symbol: SymbolRequestDTO): Promise<ISymbol>;
  updateSymbol(id: string | number, symbol: ISymbol): Promise<void>;
  deleteSymbol(id: string | number): Promise<void>;
}
