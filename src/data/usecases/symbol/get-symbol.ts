import { ISymbol } from "@/domain/entities";
import { SymbolRepository } from "@/data/protocols/db";
import { GetSymbol } from "@/domain/use-cases/symbol";

export class DbGetSymbol implements GetSymbol {
  private symbolRepository: SymbolRepository;

  constructor(symbolRepository: SymbolRepository) {
    this.symbolRepository = symbolRepository;
  }
  async execute(id: number | string): Promise<null | ISymbol> {
    const symbol = this.symbolRepository.getSymbol(id);
    return symbol;
  }
}
