import { RemoveImpactUseCase } from "./interfaces/remove-impact"
import { SymbolRepository } from "../../../repositories/symbol-repository"

export class RemoveImpact implements RemoveImpactUseCase {
    private symbolRepository: SymbolRepository
    constructor(symbolRepository: SymbolRepository) {
        this.symbolRepository = symbolRepository
    }
    async execute(id: number | string): Promise<void> {
        return await this.symbolRepository.removeImpact(id)
    };
}