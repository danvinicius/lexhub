import { SymbolRepository } from '@/infra/db/protocols';

export class DeleteSynonymUseCase {
  private symbolRepository: SymbolRepository;
  constructor(symbolRepository: SymbolRepository) {
    this.symbolRepository = symbolRepository;
  }
  async execute(id: number | string): Promise<void> {
    return await this.symbolRepository.deleteSynonym(id);
  }
}
