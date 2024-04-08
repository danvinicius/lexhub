import { SymbolRepository } from "@/protocols/db"

export class DeleteImpactUseCase {
    private symbolRepository: SymbolRepository
    constructor(symbolRepository: SymbolRepository) {
        this.symbolRepository = symbolRepository
    }
    async execute(id: number | string): Promise<void> {
        return await this.symbolRepository.deleteImpact(id)
    };
}