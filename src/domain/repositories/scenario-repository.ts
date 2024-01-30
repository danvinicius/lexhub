import { Scenario } from "../entities/scenario";
import { ScenarioDatabaseWrapper } from "../../data/interfaces/wrapper/scenario-database-wrapper";
import { ScenarioRepository } from "../interfaces/repositories/scenario-repository";

export class ScenarioRepositoryImpl implements ScenarioRepository {
  private scenarioDbWrapper: ScenarioDatabaseWrapper;

  constructor(scenarioDbWrapper: ScenarioDatabaseWrapper) {
    this.scenarioDbWrapper = scenarioDbWrapper;
  }
  async getScenario(id: string | number): Promise<Scenario> {
    const scenario = await this.scenarioDbWrapper.findById(id);
    return scenario;
  }
  async getAllScenarios(): Promise<Scenario[]> {
    const scenarios = await this.scenarioDbWrapper.findAll();
    return scenarios;
  }
  async createScenario(scenario: Scenario): Promise<undefined | Scenario> {
    const createdScenario = await this.scenarioDbWrapper.insert(scenario);
    return createdScenario;
  }
  async updateScenario(id: string, scenario: Scenario): Promise<undefined | Scenario> {
    const updatedScenrio = await this.scenarioDbWrapper.updateById(id, scenario);
    return updatedScenrio;
  }
  async deleteScenario(id: string): Promise<void> {
    await this.scenarioDbWrapper.deleteById(id);
  }
}
