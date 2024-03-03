import { CreateImpactUseCase } from './interfaces';
import { CreateImpactRequestDTO } from '../../../../application/http/dtos/create-impact-request-dto';
import { SymbolRepository } from '../../../repositories/symbol-repository';

export class CreateImpact implements CreateImpactUseCase {
    private symbolRepository: SymbolRepository
    constructor(symbolRepository: SymbolRepository) {
        this.symbolRepository = symbolRepository
    }
    async execute(impact: CreateImpactRequestDTO): Promise<void> {
        return await this.symbolRepository.createImpact(impact);
    }
}