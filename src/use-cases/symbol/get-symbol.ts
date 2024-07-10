import { ISymbol } from '@/entities';
import { SymbolRepository } from '@/infra/db/repositories';
import { NotFoundError } from '@/util/errors';

export class GetSymbolUseCase {
  private symbolRepository: SymbolRepository;

  constructor(symbolRepository: SymbolRepository) {
    this.symbolRepository = symbolRepository;
  }
  async execute(id: number): Promise<null | ISymbol> {
    const symbol = await this.symbolRepository.getSymbol(id);
    if (!symbol) {
      throw new NotFoundError('Symbol not found');
    }
    return symbol;
  }
}
