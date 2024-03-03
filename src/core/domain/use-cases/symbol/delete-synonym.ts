import { DeleteSynonymUseCase } from "./interfaces"
import { SymbolRepository } from "../../../repositories/symbol-repository"

export class DeleteSynonym implements DeleteSynonymUseCase {
    private symbolRepository: SymbolRepository
    constructor(symbolRepository: SymbolRepository) {
        this.symbolRepository = symbolRepository
    }
    async execute(id: number | string): Promise<void> {
        return await this.symbolRepository.deleteSynonym(id)
    };
}