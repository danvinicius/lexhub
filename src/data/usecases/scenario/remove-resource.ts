import { AddOrRemoveEntity, RemoveResource } from "@/domain/use-cases/scenario";
import { ScenarioRepository } from '@/data/protocols/db'

export class DbRemoveResource implements RemoveResource {
    private scenarioRepository: ScenarioRepository;
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute({resourceId, scenarioId}: AddOrRemoveEntity): Promise<void> {
        return await this.scenarioRepository.removeResource(scenarioId, resourceId)
    };
}