import { IScenario } from '@/entities';
import { ProjectRepository, ScenarioRepository } from '@/protocols/db';
import { CreateManyScenariosRequestDTO } from '@/infra/http/dtos';
import { InvalidParamError } from '@/util/errors';

export class CreateManyScenariosUseCase {
  constructor(
    private scenarioRepository: ScenarioRepository,
    private projectRepository: ProjectRepository
  ) {}

  async execute(data: CreateManyScenariosRequestDTO): Promise<IScenario[]> {
    const projectExists = await this.projectRepository.getProject(
      data.projectId
    );
    if (!projectExists) {
      throw new InvalidParamError('projectId');
    }
    return await this.scenarioRepository.createManyScenarios(data);
  }
}
