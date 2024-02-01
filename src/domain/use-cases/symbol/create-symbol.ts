import { ISymbol } from "../../entities/symbol";
import { SymbolRepository } from "../../../interfaces/repositories/symbol-repository";
import { CreateSymbolUseCase } from "../../../interfaces/use-cases/symbol/create-symbol";
import { CreateSymbolRequestDTO } from "../../dto/create-symbol-request-dto";

export class CreateSymbol implements CreateSymbolUseCase {
  private symbolRepository: SymbolRepository;

  constructor(symbolRepository: SymbolRepository) {
    this.symbolRepository = symbolRepository;
  }

  async execute(symbol: CreateSymbolRequestDTO): Promise<ISymbol> {
    return await this.symbolRepository.createSymbol(symbol);
  }
}
