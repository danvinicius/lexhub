import { Symbol } from "../../entities/symbol";
import { SymbolRepository } from "../../interfaces/repositories/symbol-repository";
import { GetAllSymbolsUseCase } from "../../interfaces/use-cases/symbol/get-all-symbols";

export class GetAllSymbols implements GetAllSymbolsUseCase {
  private symbolRepository: SymbolRepository;

  constructor(symbolRepository: SymbolRepository) {
    this.symbolRepository = symbolRepository;
  }

  async execute(): Promise<Symbol[]> {
    const symbols = await this.symbolRepository.getAllSymbols();
    return symbols;
  }
}