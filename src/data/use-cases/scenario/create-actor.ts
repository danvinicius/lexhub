import { CreateActor } from '@/domain/use-cases/scenario';
import { CreateActorRequestDTO } from '@/presentation/http/dtos';
import { ScenarioRepository } from '@/data/protocols/db';

export class DbCreateActor implements CreateActor {
    private scenarioRepository: ScenarioRepository
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(actor: CreateActorRequestDTO): Promise<void> {
        return await this.scenarioRepository.createActor(actor);
    }
}