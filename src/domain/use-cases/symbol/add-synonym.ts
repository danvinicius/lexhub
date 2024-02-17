import { AddSynonymUseCase } from '../../../interfaces/use-cases/symbol/add-synonym';
import { AddSynonymRequestDTO } from '../../dto/add-synonym-request-dto';
import { SymbolRepository } from '../../../interfaces/repositories/symbol-repository';

export class AddSynonym implements AddSynonymUseCase {
    private symbolRepository: SymbolRepository
    constructor(symbolRepository: SymbolRepository) {
        this.symbolRepository = symbolRepository
    }
    async execute(synonym: AddSynonymRequestDTO): Promise<void> {
        return await this.symbolRepository.addSynonym(synonym);
    }
}