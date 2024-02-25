import { CreateContextUseCase } from './interfaces/create-context';
import { CreateContextRequestDTO } from '../../../../application/http/dtos/create-context-request-dto';
import { ScenarioRepository } from '../../../repositories/scenario-repository';

export class CreateContext implements CreateContextUseCase {
    private scenarioRepository: ScenarioRepository
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(context: CreateContextRequestDTO): Promise<void> {
        return await this.scenarioRepository.createContext(context);
    }
}