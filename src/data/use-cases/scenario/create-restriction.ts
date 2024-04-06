import { CreateRestriction } from '@/domain/use-cases/scenario';
import { CreateRestrictionRequestDTO } from '@/presentation/http/dtos';
import { ScenarioRepository } from '@/data/protocols/db';

export class DbCreateRestriction implements CreateRestriction {
    private scenarioRepository: ScenarioRepository
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(context: CreateRestrictionRequestDTO): Promise<void> {
        return await this.scenarioRepository.createRestriction(context);
    }
}