import { CreateSynonym } from '@/domain/use-cases/symbol';
import { CreateSynonymRequestDTO } from '@/presentation/http/dtos';
import { SymbolRepository } from '@/data/protocols/db';

export class DbCreateSynonym implements CreateSynonym {
    private symbolRepository: SymbolRepository
    constructor(symbolRepository: SymbolRepository) {
        this.symbolRepository = symbolRepository
    }
    async execute(synonym: CreateSynonymRequestDTO): Promise<void> {
        return await this.symbolRepository.createSynonym(synonym);
    }
}