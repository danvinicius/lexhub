import { Symbol } from "../entities/symbol";
import { SymbolDatabaseWrapper } from "../../data/interfaces/wrapper/symbol-database-wrapper";
import { SymbolRepository } from "../interfaces/repositories/symbol-repository";

export class SymbolRepositoryImpl implements SymbolRepository {
  private symbolDbWrapper: SymbolDatabaseWrapper;

  constructor(symbolDbWrapper: SymbolDatabaseWrapper) {
    this.symbolDbWrapper = symbolDbWrapper;
  }
  async getSymbol(id: string): Promise<null | Symbol> {
    const symbol = await this.symbolDbWrapper.findById(id);
    return symbol;
  }
  async getAllSymbols(): Promise<Symbol[]> {
    const symbols = await this.symbolDbWrapper.findAll();
    return symbols;
  }
  async createSymbol(symbol: Symbol): Promise<string | number> {
    const symbolId = await this.symbolDbWrapper.insert(symbol);
    return symbolId;
  }
  async updateSymbol(id: string, symbol: Symbol): Promise<void> {
    await this.symbolDbWrapper.updateById(id, symbol);
  }
  async deleteSymbol(id: string): Promise<void> {
    await this.symbolDbWrapper.deleteById(id);
  }
}
