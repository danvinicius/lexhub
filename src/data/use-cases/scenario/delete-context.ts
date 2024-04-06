import { DeleteContext } from "@/domain/use-cases/scenario";
import { ScenarioRepository } from '@/data/protocols/db'

export class DbDeleteContext implements DeleteContext {
    private scenarioRepository: ScenarioRepository;
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(id: number | string): Promise<void> {
        return await this.scenarioRepository.deleteContext(id)
    };
}