import { UpdateSymbolRequestDTO } from '@/infra/http/dtos';
import { SymbolRepository } from '@/infra/db/protocols';
import { InvalidParamError } from '@/util/errors';

export namespace UpdateSymbolUseCase {
  export interface Params {
    id: number | string;
    symbol: UpdateSymbolRequestDTO;
  }
}

export class UpdateSymbolUseCase {
  private symbolRepository: SymbolRepository;

  constructor(symbolRepository: SymbolRepository) {
    this.symbolRepository = symbolRepository;
  }
  async execute({ id, symbol }: UpdateSymbolUseCase.Params): Promise<void> {
    const symbolExists = await this.symbolRepository.getSymbol(id);
    if (!symbolExists) {
      throw new InvalidParamError('symbolId');
    }
    await this.symbolRepository.updateSymbol(id, symbol);
  }
}
