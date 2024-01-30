import { Scenario } from "../../entities/scenario";
import { ProjectRepository } from "../../interfaces/repositories/project-repository";
import { ScenarioRepository } from "../../interfaces/repositories/scenario-repository";
import { CreateScenarioUseCase } from "../../interfaces/use-cases/scenario/create-scenario";

export class CreateScenario implements CreateScenarioUseCase {
  private scenarioRepository: ScenarioRepository;
  private projectRepository: ProjectRepository;

  constructor(scenarioRepository: ScenarioRepository, projectRepository: ProjectRepository) {
    this.scenarioRepository = scenarioRepository;
    this.projectRepository = projectRepository;
  }

  async execute(scenario: Scenario): Promise<Scenario> {
    const { project } = scenario
    const projectExists = await this.projectRepository.getProject(project);
    
    if (!projectExists?.id) {
      throw new Error('Project does not exist')
    }

    const createdScenario = await this.scenarioRepository.createScenario(scenario);

    if (!createdScenario || !createdScenario?.id) {
      throw new Error('Could not create scenario')
    }

    await this.projectRepository.updateProject(projectExists.id, {
      ...projectExists,
      scenarios: projectExists.scenarios?.length ? [...projectExists.scenarios, createdScenario] : [createdScenario],
    })

    return createdScenario;
  }
}
