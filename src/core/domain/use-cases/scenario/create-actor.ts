import { CreateActorUseCase } from './interfaces/create-actor';
import { CreateActorRequestDTO } from '../../../../application/http/dtos/create-actor-request-dto';
import { ScenarioRepository } from '../../../repositories/scenario-repository';

export class CreateActor implements CreateActorUseCase {
    private scenarioRepository: ScenarioRepository
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(actor: CreateActorRequestDTO): Promise<void> {
        return await this.scenarioRepository.createActor(actor);
    }
}