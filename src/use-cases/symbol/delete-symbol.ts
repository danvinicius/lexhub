import { SymbolRepository } from "@/protocols/db";
import { InvalidParamError } from "@/util/errors";

export class DeleteSymbolUseCase {
  private symbolRepository: SymbolRepository;

  constructor(symbolRepository: SymbolRepository) {
    this.symbolRepository = symbolRepository;
  }

  async execute(id: string): Promise<void> {
    const symbolExists = await this.symbolRepository.getSymbol(id);
    if (!symbolExists) {
      throw new InvalidParamError("scenarioId");
    }
    await this.symbolRepository.deleteSymbol(id);
  }
}
