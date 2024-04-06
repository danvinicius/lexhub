import { DeleteActor } from "@/domain/use-cases/scenario";
import { ScenarioRepository } from '@/data/protocols/db'

export class DbDeleteActor implements DeleteActor {
    private scenarioRepository: ScenarioRepository;
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(id: number | string): Promise<void> {
        return await this.scenarioRepository.deleteActor(id)
    };
}