import { CreateImpact } from '@/domain/use-cases/symbol';
import { CreateImpactRequestDTO } from '@/presentation/http/dtos';
import { SymbolRepository } from '@/data/protocols/db';

export class DbCreateImpact implements CreateImpact {
    private symbolRepository: SymbolRepository
    constructor(symbolRepository: SymbolRepository) {
        this.symbolRepository = symbolRepository
    }
    async execute(impact: CreateImpactRequestDTO): Promise<void> {
        return await this.symbolRepository.createImpact(impact);
    }
}