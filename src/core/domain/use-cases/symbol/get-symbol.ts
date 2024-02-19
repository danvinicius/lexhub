import { ISymbol } from "../../entities/symbol";
import { SymbolRepository } from "../../../repositories/symbol-repository";
import { GetSymbolUseCase } from "./interfaces/get-symbol";

export class GetSymbol implements GetSymbolUseCase {
  private symbolRepository: SymbolRepository;

  constructor(symbolRepository: SymbolRepository) {
    this.symbolRepository = symbolRepository;
  }
  async execute(id: string | number): Promise<null | ISymbol> {
    const symbol = this.symbolRepository.getSymbol(id);
    return symbol;
  }
}
