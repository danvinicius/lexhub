import { CreateException } from '@/domain/use-cases/scenario';
import { CreateExceptionRequestDTO } from '@/presentation/http/dtos';
import { ScenarioRepository } from '@/data/protocols/db';

export class DbCreateException implements CreateException {
    private scenarioRepository: ScenarioRepository
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(exception: CreateExceptionRequestDTO): Promise<void> {
        return await this.scenarioRepository.createException(exception);
    }
}