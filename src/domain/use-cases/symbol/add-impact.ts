import { AddImpactUseCase } from '../../../interfaces/use-cases/symbol/add-impact';
import { AddImpactRequestDTO } from '../../dto/add-impact-request-dto';
import { SymbolRepository } from '../../../interfaces/repositories/symbol-repository';

export class AddImpact implements AddImpactUseCase {
    private symbolRepository: SymbolRepository
    constructor(symbolRepository: SymbolRepository) {
        this.symbolRepository = symbolRepository
    }
    async execute(impact: AddImpactRequestDTO): Promise<void> {
        return await this.symbolRepository.addImpact(impact);
    }
}