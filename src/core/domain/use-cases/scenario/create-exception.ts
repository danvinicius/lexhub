import { CreateExceptionUseCase } from './interfaces';
import { CreateExceptionRequestDTO } from '../../../../application/http/dtos/create-exception-request-dto';
import { ScenarioRepository } from '../../../repositories/scenario-repository';

export class CreateException implements CreateExceptionUseCase {
    private scenarioRepository: ScenarioRepository
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(exception: CreateExceptionRequestDTO): Promise<void> {
        return await this.scenarioRepository.createException(exception);
    }
}