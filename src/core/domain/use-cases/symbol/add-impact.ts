import { AddImpactUseCase } from './interfaces/add-impact';
import { AddImpactRequestDTO } from '../../../../application/dtos/add-impact-request-dto';
import { SymbolRepository } from '../../../repositories/symbol-repository';

export class AddImpact implements AddImpactUseCase {
    private symbolRepository: SymbolRepository
    constructor(symbolRepository: SymbolRepository) {
        this.symbolRepository = symbolRepository
    }
    async execute(impact: AddImpactRequestDTO): Promise<void> {
        return await this.symbolRepository.addImpact(impact);
    }
}