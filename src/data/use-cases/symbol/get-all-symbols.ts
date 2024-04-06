import { ISymbol } from "@/domain/entities";
import { SymbolRepository } from "@/data/protocols/db";
import { GetAllSymbols } from "@/domain/use-cases/symbol";

export class DbGetAllSymbols implements GetAllSymbols {
  private symbolRepository: SymbolRepository;

  constructor(symbolRepository: SymbolRepository) {
    this.symbolRepository = symbolRepository;
  }

  async execute(projectId: number | string): Promise<ISymbol[]> {
    const symbols = await this.symbolRepository.getAllSymbols(projectId);
    return symbols;
  }
}
