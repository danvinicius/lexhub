import { SymbolRepository } from "../../../repositories/symbol-repository";
import { DeleteSymbolUseCase } from "./interfaces";

export class DeleteSymbol implements DeleteSymbolUseCase {
  private symbolRepository: SymbolRepository;

  constructor(symbolRepository: SymbolRepository) {
    this.symbolRepository = symbolRepository;
  }

  async execute(id: string): Promise<void> {
    await this.symbolRepository.deleteSymbol(id);
  }
}
