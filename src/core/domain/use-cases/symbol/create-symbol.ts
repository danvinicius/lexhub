import { ISymbol } from "../../entities/symbol";
import { SymbolRepository } from "../../../repositories/symbol-repository";
import { CreateSymbolUseCase } from "./interfaces/create-symbol";
import { CreateSymbolRequestDTO } from "../../../../application/dtos/create-symbol-request-dto";

export class CreateSymbol implements CreateSymbolUseCase {
  private symbolRepository: SymbolRepository;

  constructor(symbolRepository: SymbolRepository) {
    this.symbolRepository = symbolRepository;
  }

  async execute(symbol: CreateSymbolRequestDTO): Promise<ISymbol> {
    return await this.symbolRepository.createSymbol(symbol);
  }
}
