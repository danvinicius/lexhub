import { CreateSynonymUseCase } from './interfaces/create-synonym';
import { CreateSynonymRequestDTO } from '../../../../application/http/dtos/create-synonym-request-dto';
import { SymbolRepository } from '../../../repositories/symbol-repository';

export class CreateSynonym implements CreateSynonymUseCase {
    private symbolRepository: SymbolRepository
    constructor(symbolRepository: SymbolRepository) {
        this.symbolRepository = symbolRepository
    }
    async execute(synonym: CreateSynonymRequestDTO): Promise<void> {
        return await this.symbolRepository.createSynonym(synonym);
    }
}