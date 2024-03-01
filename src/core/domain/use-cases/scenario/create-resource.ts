import { CreateResourceUseCase } from './interfaces/create-resource';
import { CreateResourceRequestDTO } from '../../../../application/http/dtos/create-resource-request-dto';
import { ScenarioRepository } from '../../../repositories/scenario-repository';

export class CreateResource implements CreateResourceUseCase {
    private scenarioRepository: ScenarioRepository
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(resource: CreateResourceRequestDTO): Promise<void> {
        return await this.scenarioRepository.createResource(resource);
    }
}