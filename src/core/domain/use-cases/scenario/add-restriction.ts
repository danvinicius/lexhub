import { AddRestrictionUseCase } from './interfaces/add-restriction';
import { AddRestrictionRequestDTO } from '../../../../application/http/dtos/add-restriction-request-dto';
import { ScenarioRepository } from '../../../repositories/scenario-repository';

export class AddRestriction implements AddRestrictionUseCase {
    private scenarioRepository: ScenarioRepository
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(context: AddRestrictionRequestDTO): Promise<void> {
        return await this.scenarioRepository.addRestriction(context);
    }
}