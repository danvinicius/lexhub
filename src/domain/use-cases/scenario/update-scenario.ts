import { Scenario } from "../../entities/scenario";
import { ProjectRepository } from "../../../interfaces/repositories/project-repository";
import { ScenarioRepository } from "../../../interfaces/repositories/scenario-repository";
import { UpdateScenarioUseCase } from "../../../interfaces/use-cases/scenario/update-scenario";

export class UpdateScenario implements UpdateScenarioUseCase {
  private scenarioRepository: ScenarioRepository;
  private projectRepository: ProjectRepository;

  constructor(
    scenarioRepository: ScenarioRepository,
    projectRepository: ProjectRepository
  ) {
    this.scenarioRepository = scenarioRepository;
    this.projectRepository = projectRepository;
  }
  async execute(id: string, scenario: Scenario): Promise<Scenario> {
    const { project } = scenario;
    const projectExists = await this.projectRepository.getProject(project);

    if (!projectExists?.id) {
      throw new Error("Project does not exist");
    }

    const updatedScenario = await this.scenarioRepository.updateScenario(
      id,
      scenario
    );

    if (!updatedScenario || !updatedScenario?.id) {
      throw new Error("Could not update scenario");
    }

    const scenarioIndex = projectExists.scenarios?.indexOf(scenario);

    const newScenarios = projectExists.scenarios;

    if (scenarioIndex) {
      newScenarios?.splice(scenarioIndex, 1);
      newScenarios?.push(updatedScenario);
    }

    await this.projectRepository.updateProject(projectExists.id, {
      ...projectExists,
      scenarios: newScenarios,
    });

    return updatedScenario;
  }
}
