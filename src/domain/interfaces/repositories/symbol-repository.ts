import { Symbol } from "../../entities/symbol";

export interface SymbolRepository {
  getSymbol(id: string | number): Promise<null | Symbol>;
  getAllSymbols(): Promise<Symbol[]>;
  createSymbol(symbol: Symbol): Promise<string | number>;
  updateSymbol(id: string | number, symbol: Symbol): Promise<void>;
  deleteSymbol(id: string | number): Promise<void>;
}
