import { DeleteSynonym } from "@/domain/use-cases/symbol"
import { SymbolRepository } from "@/data/protocols/db"

export class DbDeleteSynonym implements DeleteSynonym {
    private symbolRepository: SymbolRepository
    constructor(symbolRepository: SymbolRepository) {
        this.symbolRepository = symbolRepository
    }
    async execute(id: number | string): Promise<void> {
        return await this.symbolRepository.deleteSynonym(id)
    };
}