import { ScenarioRepository } from "../../../core/repositories/scenario-repository";
import { Scenario } from "../../database/mysql/typeorm/entity/Scenario";
import { DataSource } from "typeorm";
import { Project } from "../../database/mysql/typeorm/entity/Project";
import { CreateScenarioRequestDTO } from "../../../application/http/dtos/create-scenario-request-dto";
import { UpdateScenarioRequestDTO } from "../../../application/http/dtos/update-scenario-request-dto";
import { Logger } from '../../../config/logger'
import { AddExceptionRequestDTO } from "../../../application/http/dtos/add-exception-request-dto";
import { AddContextRequestDTO } from "../../../application/http/dtos/add-context-request-dto";
import { Exception } from "../../database/mysql/typeorm/entity/Exception";
import { Context } from "../../database/mysql/typeorm/entity/Context";
import { AddRestrictionRequestDTO } from "../../../application/http/dtos/add-restriction-request-dto";
import { Restriction } from "../../database/mysql/typeorm/entity/Restriction";
import { IEpisode, IResource } from "../../../core/domain/entities/scenario";

const logger = Logger.getInstance()

export class MySQLScenarioRepository implements ScenarioRepository {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async getScenario(id: number): Promise<Scenario> {
    const [scenario] = await this.dataSource.manager.find(Scenario, {
      where: {
        id,
      },
      relations: {
        exceptions: true,
        episodes: true,
        context: {
          restrictions: true,
        },
        resources: true,
        actors: true,
        groups: true,
        project: true,
      },
    });
    if (!scenario) {
      throw new Error("Scenario not found");
    }
    return scenario;
  }
  async getAllScenarios(projectId: number): Promise<Scenario[]> {
    const scenarios = await this.dataSource.manager.find(Scenario, {
      where: {
        project: {
          id: projectId
        }
      },
      relations: {
        exceptions: true,
        episodes: true,
        context: {
          restrictions: true,
        },
        resources: true,
        actors: true,
        groups: true,
      },
    });
    return scenarios;
  }
  async createScenario(data: CreateScenarioRequestDTO): Promise<Scenario> {
    try {
      const [project] = await this.dataSource.manager.findBy(Project, {
        id: data.projectId as number,
      });
      if (!project) {
        throw new Error("Project does not exist");
      }
      const scenario = new Scenario();
      scenario.title = data.title;
      scenario.goal = data.goal;
      scenario.project = project;

      await this.dataSource.manager.save(Scenario, scenario);

      return scenario;
    } catch (error: any) {
      logger.error(error.message)
      throw new Error(error.message);
    }
  }
  async addException(data: AddExceptionRequestDTO): Promise<void> {
    try {
      const scenario = await this.getScenario(data?.scenarioId as number);
      const exception = new Exception();
      exception.description = data?.description;
      exception.scenario = scenario;
      await this.dataSource.manager.save(Exception, exception);
    } catch (error: any) {
      logger.error(error.message)
      throw new Error("Error on adding exception");
    }
  }
  async addContext(data: AddContextRequestDTO): Promise<void> {
    try {
      const scenario = await this.getScenario(data?.scenarioId as number);
      const context = new Context();
      context.geographicLocation = data?.geographicLocation;
      context.temporalLocation = data?.temporalLocation;
      context.preCondition = data?.preCondition;
      context.scenario = scenario;
      await this.dataSource.manager.save(Context, context);
    } catch (error: any) {
      logger.error(error.message)
      throw new Error("Error on adding context");
    }
  }
  async addRestriction(data: AddRestrictionRequestDTO): Promise<void> {
    try {
      const scenario = await this.getScenario(data?.scenarioId as number);
      const context = scenario.context;
      const resource = scenario.resources.find((r: IResource) => r.id == data?.resourceId)
      const episode = scenario.episodes.find((r: IEpisode) => r.id == data?.episodeId)
      const restriction = new Restriction();
      restriction.description = data?.description;
      restriction.context = context;
      if (data.resourceId) {
        if (!resource) {
          throw new Error("Error on adding restriction");
        }
        restriction.resource = resource;
      }
      if (data.episodeId) {
        if (!episode) {
          throw new Error("Error on adding restriction");
        }
        restriction.episode = episode;
      }
      await this.dataSource.manager.save(Restriction, restriction);
    } catch (error: any) {
      logger.error(error.message)
      throw new Error("Error on adding restriction");
    }
  }
  async removeException(id: number): Promise<void> {
    try {
      const [exception] = await this.dataSource.manager.findBy(Exception, {
        id,
      });
      if (!exception) {
        throw new Error("Exception does not exist");
      }
      await this.dataSource.manager.delete(Exception, id);
    } catch (error: any) {
      logger.error(error.message)
      throw new Error("Error on removing exception");
    }
  }
  async removeContext(id: number): Promise<void> {
    try {
      const [context] = await this.dataSource.manager.findBy(Context, {
        id,
      });
      if (!context) {
        throw new Error("Context does not exist");
      }
      await this.dataSource.manager.delete(Context, id);
    } catch (error: any) {
      logger.error(error.message)
      throw new Error("Error on removing context");
    }
  }
  async removeRestriction(id: number): Promise<void> {
    try {
      const [restriction] = await this.dataSource.manager.findBy(Restriction, {
        id,
      });
      if (!restriction) {
        throw new Error("Restriction does not exist");
      }
      await this.dataSource.manager.delete(Restriction, id);
    } catch (error: any) {
      logger.error(error.message)
      throw new Error("Error on removing restriction");
    }
  }
  async updateScenario(id: string, data: UpdateScenarioRequestDTO): Promise<void> {
    try {
      await this.dataSource.manager.update(Scenario, { id }, data);
    } catch (error: any) {
      logger.error(error.message)
      throw new Error("Error on updating scenario");
    }
  }
  async deleteScenario(id: string): Promise<void> {
    try {
      await this.dataSource.manager.delete(Scenario, id);
    } catch (error: any) {
      logger.error(error.message)
      throw new Error("Error on deleting scenario");
    }
  }
}
