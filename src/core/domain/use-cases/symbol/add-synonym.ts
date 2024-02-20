import { AddSynonymUseCase } from './interfaces/add-synonym';
import { AddSynonymRequestDTO } from '../../../../application/http/dtos/add-synonym-request-dto';
import { SymbolRepository } from '../../../repositories/symbol-repository';

export class AddSynonym implements AddSynonymUseCase {
    private symbolRepository: SymbolRepository
    constructor(symbolRepository: SymbolRepository) {
        this.symbolRepository = symbolRepository
    }
    async execute(synonym: AddSynonymRequestDTO): Promise<void> {
        return await this.symbolRepository.addSynonym(synonym);
    }
}