import { SymbolRepository } from '@/infra/db/repositories';

export class DeleteImpactUseCase {
  private symbolRepository: SymbolRepository;
  constructor(symbolRepository: SymbolRepository) {
    this.symbolRepository = symbolRepository;
  }
  async execute(id: number): Promise<void> {
    return await this.symbolRepository.deleteImpact(id);
  }
}
