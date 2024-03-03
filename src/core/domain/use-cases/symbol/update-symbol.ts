import { SymbolRepository } from "../../../repositories/symbol-repository";
import { UpdateSymbolUseCase, UpdateSymbolUseCaseParams } from "./interfaces";
import { UpdateSymbolRequestDTO } from "../../../../application/http/dtos/update-symbol-request-dto";

export class UpdateSymbol implements UpdateSymbolUseCase {
  private symbolRepository: SymbolRepository;

  constructor(symbolRepository: SymbolRepository) {
    this.symbolRepository = symbolRepository;
  }
  async execute({ id, symbol }: UpdateSymbolUseCaseParams): Promise<void> {
    await this.symbolRepository.updateSymbol(id, symbol);
  }
}
