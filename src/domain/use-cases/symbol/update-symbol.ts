import { Symbol } from "../../entities/symbol";
import { SymbolRepository } from "../../interfaces/repositories/symbol-repository";
import { UpdateSymbolUseCase } from "../../interfaces/use-cases/symbol/update-symbol";

export class UpdateSymbol implements UpdateSymbolUseCase {
  private symbolRepository: SymbolRepository;

  constructor(symbolRepository: SymbolRepository) {
    this.symbolRepository = symbolRepository;
  }
  async execute(id: string, symbol: Symbol): Promise<void> {
    await this.symbolRepository.updateSymbol(id, symbol);
  }
}
