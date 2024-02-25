import { AddActorUseCase } from './interfaces/add-actor';
import { AddActorRequestDTO } from '../../../../application/http/dtos/add-actor-request-dto';
import { ScenarioRepository } from '../../../repositories/scenario-repository';

export class AddActor implements AddActorUseCase {
    private scenarioRepository: ScenarioRepository
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(id: number | string, actor: AddActorRequestDTO): Promise<void> {
        return await this.scenarioRepository.addActor(id, actor);
    }
}