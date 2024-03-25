import { ISymbol } from "@/domain/entities";
import { SymbolRepository } from "@/data/protocols/db";
import { CreateSymbol } from "@/domain/use-cases/symbol";
import { CreateSymbolRequestDTO } from "@/presentation/http/dtos";

export class DbCreateSymbol implements CreateSymbol {
  private symbolRepository: SymbolRepository;

  constructor(symbolRepository: SymbolRepository) {
    this.symbolRepository = symbolRepository;
  }

  async execute(symbol: CreateSymbolRequestDTO): Promise<ISymbol> {
    return await this.symbolRepository.createSymbol(symbol);
  }
}
