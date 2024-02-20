import { SymbolRepository } from "../../../repositories/symbol-repository";
import { UpdateSymbolUseCase } from "./interfaces/update-symbol";
import { UpdateSymbolRequestDTO } from "../../../../application/http/dtos/update-symbol-request-dto";

export class UpdateSymbol implements UpdateSymbolUseCase {
  private symbolRepository: SymbolRepository;

  constructor(symbolRepository: SymbolRepository) {
    this.symbolRepository = symbolRepository;
  }
  async execute(id: string, symbol: UpdateSymbolRequestDTO): Promise<void> {
    await this.symbolRepository.updateSymbol(id, symbol);
  }
}
