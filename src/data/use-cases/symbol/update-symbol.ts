import { SymbolRepository } from "@/data/protocols/db";
import { UpdateSymbol } from "@/domain/use-cases/symbol";

export class DbUpdateSymbol implements UpdateSymbol {
  private symbolRepository: SymbolRepository;

  constructor(symbolRepository: SymbolRepository) {
    this.symbolRepository = symbolRepository;
  }
  async execute({ id, symbol }: UpdateSymbol.Params): Promise<void> {
    await this.symbolRepository.updateSymbol(id, symbol);
  }
}
