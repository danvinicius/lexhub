import { ISymbol } from '@/entities';
import { SymbolRepository } from '@/protocols/db';
import { NotFoundError } from '@/util/errors';

export class GetSymbolUseCase {
  private symbolRepository: SymbolRepository;

  constructor(symbolRepository: SymbolRepository) {
    this.symbolRepository = symbolRepository;
  }
  async execute(id: number | string): Promise<null | ISymbol> {
    const symbol = await this.symbolRepository.getSymbol(id);
    if (!symbol) {
      throw new NotFoundError('Symbol not found');
    }
    return symbol;
  }
}
