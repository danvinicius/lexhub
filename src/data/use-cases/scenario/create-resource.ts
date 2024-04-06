import { CreateResource } from '@/domain/use-cases/scenario';
import { CreateResourceRequestDTO } from '@/presentation/http/dtos';
import { ScenarioRepository } from '@/data/protocols/db';

export class DbCreateResource implements CreateResource {
    private scenarioRepository: ScenarioRepository
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(resource: CreateResourceRequestDTO): Promise<void> {
        return await this.scenarioRepository.createResource(resource);
    }
}