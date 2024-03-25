import { DeleteImpact } from "@/domain/use-cases/symbol"
import { SymbolRepository } from "@/data/protocols/db"

export class DbDeleteImpact implements DeleteImpact {
    private symbolRepository: SymbolRepository
    constructor(symbolRepository: SymbolRepository) {
        this.symbolRepository = symbolRepository
    }
    async execute(id: number | string): Promise<void> {
        return await this.symbolRepository.deleteImpact(id)
    };
}