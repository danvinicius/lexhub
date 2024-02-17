import { RemoveSynonymUseCase } from '../../../interfaces/use-cases/symbol/remove-synonym'
import { SymbolRepository } from '../../../interfaces/repositories/symbol-repository'

export class RemoveSynonym implements RemoveSynonymUseCase {
    private symbolRepository: SymbolRepository
    constructor(symbolRepository: SymbolRepository) {
        this.symbolRepository = symbolRepository
    }
    async execute(id: number | string): Promise<void> {
        return await this.symbolRepository.removeSynonym(id)
    };
}