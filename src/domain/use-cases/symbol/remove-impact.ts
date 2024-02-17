import { RemoveImpactUseCase } from '../../../interfaces/use-cases/symbol/remove-impact'
import { SymbolRepository } from '../../../interfaces/repositories/symbol-repository'

export class RemoveImpact implements RemoveImpactUseCase {
    private symbolRepository: SymbolRepository
    constructor(symbolRepository: SymbolRepository) {
        this.symbolRepository = symbolRepository
    }
    async execute(id: number | string): Promise<void> {
        return await this.symbolRepository.removeImpact(id)
    };
}