import { SymbolRepository } from "@/data/protocols/db";
import { DeleteSymbol } from "@/domain/use-cases/symbol";

export class DbDeleteSymbol implements DeleteSymbol {
  private symbolRepository: SymbolRepository;

  constructor(symbolRepository: SymbolRepository) {
    this.symbolRepository = symbolRepository;
  }

  async execute(id: string): Promise<void> {
    await this.symbolRepository.deleteSymbol(id);
  }
}
