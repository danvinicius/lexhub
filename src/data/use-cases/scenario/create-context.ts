import { CreateContext } from '@/domain/use-cases/scenario';
import { CreateContextRequestDTO } from '@/presentation/http/dtos';
import { ScenarioRepository } from '@/data/protocols/db';

export class DbCreateContext implements CreateContext {
    private scenarioRepository: ScenarioRepository
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(context: CreateContextRequestDTO): Promise<void> {
        return await this.scenarioRepository.createContext(context);
    }
}