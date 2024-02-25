import { AddExceptionUseCase } from './interfaces/add-exception';
import { AddExceptionRequestDTO } from '../../../../application/http/dtos/add-exception-request-dto';
import { ScenarioRepository } from '../../../repositories/scenario-repository';

export class AddException implements AddExceptionUseCase {
    private scenarioRepository: ScenarioRepository
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(exception: AddExceptionRequestDTO): Promise<void> {
        return await this.scenarioRepository.addException(exception);
    }
}