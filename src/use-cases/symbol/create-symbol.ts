import { ISymbol } from '@/entities';
import { SymbolRepository } from '@/infra/db/protocols';
import { CreateSymbolRequestDTO } from '@/infra/http/dtos';

export class CreateSymbolUseCase {
  constructor(
    private symbolRepository: SymbolRepository,
  ) {}

  async execute(symbol: CreateSymbolRequestDTO): Promise<ISymbol> {
    return await this.symbolRepository.createSymbol(symbol);
  }
}
