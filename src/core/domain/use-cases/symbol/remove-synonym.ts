import { RemoveSynonymUseCase } from "./interfaces/remove-synonym"
import { SymbolRepository } from "../../../repositories/symbol-repository"

export class RemoveSynonym implements RemoveSynonymUseCase {
    private symbolRepository: SymbolRepository
    constructor(symbolRepository: SymbolRepository) {
        this.symbolRepository = symbolRepository
    }
    async execute(id: number | string): Promise<void> {
        return await this.symbolRepository.removeSynonym(id)
    };
}