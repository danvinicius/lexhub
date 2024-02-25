import { DeleteImpactUseCase } from "./interfaces/delete-impact"
import { SymbolRepository } from "../../../repositories/symbol-repository"

export class DeleteImpact implements DeleteImpactUseCase {
    private symbolRepository: SymbolRepository
    constructor(symbolRepository: SymbolRepository) {
        this.symbolRepository = symbolRepository
    }
    async execute(id: number | string): Promise<void> {
        return await this.symbolRepository.deleteImpact(id)
    };
}