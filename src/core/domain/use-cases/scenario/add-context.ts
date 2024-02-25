import { AddContextUseCase } from './interfaces/add-context';
import { AddContextRequestDTO } from '../../../../application/http/dtos/add-context-request-dto';
import { ScenarioRepository } from '../../../repositories/scenario-repository';

export class AddContext implements AddContextUseCase {
    private scenarioRepository: ScenarioRepository
    constructor(scenarioRepository: ScenarioRepository) {
        this.scenarioRepository = scenarioRepository
    }
    async execute(context: AddContextRequestDTO): Promise<void> {
        return await this.scenarioRepository.addContext(context);
    }
}