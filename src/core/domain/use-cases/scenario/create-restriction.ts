import { CreateRestrictionUseCase } from './interfaces/create-restriction';
import { CreateRestrictionRequestDTO } from '../../../../application/http/dtos/create-restriction-request-dto';
import { ScenarioRepository } from '../../../repositories/scenario-repository';

export class CreateRestriction implements CreateRestrictionUseCase {
    private scenarioRepository: ScenarioRepository
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(context: CreateRestrictionRequestDTO): Promise<void> {
        return await this.scenarioRepository.createRestriction(context);
    }
}