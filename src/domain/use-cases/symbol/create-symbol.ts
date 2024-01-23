import { Symbol } from "../../entities/symbol";
import { SymbolRepository } from "../../interfaces/repositories/symbol-repository";
import { CreateSymbolUseCase } from "../../interfaces/use-cases/symbol/create-symbol";

export class CreateSymbol implements CreateSymbolUseCase {
  private symbolRepository: SymbolRepository;

  constructor(symbolRepository: SymbolRepository) {
    this.symbolRepository = symbolRepository;
  }

  async execute(symbol: Symbol): Promise<string | number> {
    const symbolId = await this.symbolRepository.createSymbol(symbol);
    return symbolId;
  }
}
