import { ScenarioRepository } from "../../../core/repositories/scenario-repository";
import { Scenario } from "../../database/mysql/typeorm/entity/Scenario";
import { DataSource } from "typeorm";
import { Project } from "../../database/mysql/typeorm/entity/Project";
import { CreateScenarioRequestDTO } from "../../../application/http/dtos/create-scenario-request-dto";
import { UpdateScenarioRequestDTO } from "../../../application/http/dtos/update-scenario-request-dto";
import { CreateExceptionRequestDTO } from "../../../application/http/dtos/create-exception-request-dto";
import { CreateContextRequestDTO } from "../../../application/http/dtos/create-context-request-dto";
import { Exception } from "../../database/mysql/typeorm/entity/Exception";
import { Context } from "../../database/mysql/typeorm/entity/Context";
import { CreateRestrictionRequestDTO } from "../../../application/http/dtos/create-restriction-request-dto";
import { Restriction } from "../../database/mysql/typeorm/entity/Restriction";
import { IActor, IEpisode, INonSequentialEpisode, IResource, IScenario } from "../../../core/domain/entities/scenario";
import { CreateActorRequestDTO } from "../../../application/http/dtos/create-actor-request-dto";
import { Actor } from "../../database/mysql/typeorm/entity/Actor";
import { CreateEpisodeRequestDTO } from "../../../application/http/dtos/create-episode.request-dto";
import { Episode } from "../../database/mysql/typeorm/entity/Episode";
import { Group } from "../../database/mysql/typeorm/entity/Group";
import { NonSequentialEpisode } from "../../database/mysql/typeorm/entity/NonSequentialEpisode";
import { Resource } from "../../database/mysql/typeorm/entity/Resource";
import { CreateResourceRequestDTO } from "../../../application/http/dtos/create-resource-request-dto";
import { CreateManyScenariosRequestDTO } from "../../../application/http/dtos/create-many-scenarios-request-dto";

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
        groups: {
          nonSequentialEpisodes: true
        },
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
        groups: {
          nonSequentialEpisodes: true
        },
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
      throw new Error(error.message);
    }
  }

  async createManyScenarios(data: CreateManyScenariosRequestDTO): Promise<IScenario[]> {
    try {
      const [project] = await this.dataSource.manager.findBy(Project, {
        id: data.projectId as number,
      });
      if (!project) {
        throw new Error("Project does not exist");
      }
      const scenarios = data.scenarios.map((s: IScenario) => {
        const newScenario = new Scenario()
        newScenario.title = s.title;
        newScenario.goal = s.goal;
        newScenario.project = project;
        return newScenario;
      }) 
      await this.dataSource.manager.save(Scenario, scenarios);
      return scenarios;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async createException(data: CreateExceptionRequestDTO): Promise<void> {
    try {
      const scenario = await this.getScenario(data?.scenarioId as number);
      const exception = new Exception();
      exception.description = data?.description;
      exception.scenario = scenario;
      await this.dataSource.manager.save(Exception, exception);
    } catch (error: any) {
      throw new Error("Error on creating exception");
    }
  }
  async createContext(data: CreateContextRequestDTO): Promise<void> {
    try {
      const scenario = await this.getScenario(data?.scenarioId as number);
      const context = new Context();
      context.geographicLocation = data?.geographicLocation;
      context.temporalLocation = data?.temporalLocation;
      context.preCondition = data?.preCondition;
      context.scenario = scenario;
      await this.dataSource.manager.save(Context, context);
    } catch (error: any) {
      throw new Error("Error on creating context");
    }
  }
  async createEpisode(data: CreateEpisodeRequestDTO): Promise<void> {
    try {
      const scenario = await this.getScenario(data?.scenarioId as number);
      const { description, type, position } = data;
      if (data?.group) {
        const [episodeWithSamePositionExists] = await this.dataSource.manager.find(Episode, {
          where: {
            position: data.group as number,
          },
        })
        if (episodeWithSamePositionExists) {
          throw new Error("This position is already occupied by an episode");
        }
        const nonSequentialEpisode = new NonSequentialEpisode()
        nonSequentialEpisode.description = description;
        nonSequentialEpisode.type = type;
        nonSequentialEpisode.position = position;
        await this.dataSource.manager.save(NonSequentialEpisode, nonSequentialEpisode);
        const [groupExists] = await this.dataSource.manager.find(Group, {
          where: {
            position: data.group as number,
          },
          relations: {
            nonSequentialEpisodes: true
          }
        })
        
        if (groupExists) {
          if (groupExists.nonSequentialEpisodes.find((nse: INonSequentialEpisode) => nonSequentialEpisode.position == data.position)) {
            throw new Error("This position is already occupied by another non-sequential episode");
          }
          groupExists.nonSequentialEpisodes.push(nonSequentialEpisode)
          await this.dataSource.manager.save(Group, groupExists);
          return;
        }
        const group = new Group()
        group.scenario = scenario;
        group.position = data.group as number;
        group.nonSequentialEpisodes = [nonSequentialEpisode]
        await this.dataSource.manager.save(Group, group);
        return;
      }
      const episode = new Episode();
      episode.position = data?.position;
      episode.type = data?.type;
      episode.description = data?.description;
      episode.scenario = scenario;
      await this.dataSource.manager.save(Episode, episode);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async createRestriction(data: CreateRestrictionRequestDTO): Promise<void> {
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
          throw new Error("Error on creating restriction");
        }
        restriction.resource = resource;
      }
      if (data.episodeId) {
        if (!episode) {
          throw new Error("Error on creating restriction");
        }
        restriction.episode = episode;
      }
      await this.dataSource.manager.save(Restriction, restriction);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async deleteException(id: number): Promise<void> {
    try {
      const [exception] = await this.dataSource.manager.findBy(Exception, {
        id,
      });
      if (!exception) {
        throw new Error("Exception does not exist");
      }
      await this.dataSource.manager.delete(Exception, id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async deleteContext(id: number): Promise<void> {
    try {
      const [context] = await this.dataSource.manager.findBy(Context, {
        id,
      });
      if (!context) {
        throw new Error("Context does not exist");
      }
      await this.dataSource.manager.delete(Context, id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async deleteRestriction(id: number): Promise<void> {
    try {
      const [restriction] = await this.dataSource.manager.findBy(Restriction, {
        id,
      });
      if (!restriction) {
        throw new Error("Restriction does not exist");
      }
      await this.dataSource.manager.delete(Restriction, id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Create and actor
  async createActor(data: CreateActorRequestDTO): Promise<void> {
    try {
      const scenario = await this.getScenario(data?.scenarioId as number);
      const actor = new Actor();
      actor.name = data?.name;
      await this.dataSource.manager.save(Actor, actor);
      scenario.actors.push(actor);
      await this.dataSource.manager.save(Scenario, scenario);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Create and resource
  async createResource(data: CreateResourceRequestDTO): Promise<void> {
    try {
      const scenario = await this.getScenario(data?.scenarioId as number);
      const resource = new Resource();
      resource.name = data?.name;
      await this.dataSource.manager.save(Resource, resource);
      scenario.resources.push(resource);
      await this.dataSource.manager.save(Scenario, scenario);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Add an existing actor to a scenario
  async addActor(scenarioId: number, actorId: number): Promise<void> {
    try {
      const [actor] = await this.dataSource.manager.findBy(Actor, {
        id: actorId,
      });
      const scenario = await this.getScenario(scenarioId);
      scenario.actors.push(actor);
      await this.dataSource.manager.save(Scenario, scenario);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Add an existing resource to a scenario
  async addResource(scenarioId: number, resourceId: number): Promise<void> {
    try {
      const [resource] = await this.dataSource.manager.findBy(Resource, {
        id: resourceId,
      });
      const scenario = await this.getScenario(scenarioId);
      scenario.resources.push(resource);
      await this.dataSource.manager.save(Scenario, scenario);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteActor(id: number): Promise<void> {
    try {
      await this.dataSource.manager.delete(Actor, id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteResource(id: number): Promise<void> {
    try {
      await this.dataSource.manager.delete(Resource, id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteEpisode(id: number): Promise<void> {
    try {
      await this.dataSource.manager.delete(Episode, id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteGroup(id: number): Promise<void> {
    try {
      await this.dataSource.manager.delete(Group, id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Remove an actor from a scenario
  async removeActor(scenarioId: number, actorId: number): Promise<void> {
    try {
      const [actor] = await this.dataSource.manager.find(Actor, {
        where: {
          id: actorId,
        },
      })
      if (!actor) {
        throw new Error("Actor not found");
      }
      const scenario = await this.getScenario(scenarioId);
      scenario.actors = scenario.actors.filter((a: IActor) => {
        return a.id !== actorId
      })
      await this.dataSource.manager.save(Scenario, scenario);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Remove an resource from a scenario
  async removeResource(scenarioId: number, resourceId: number): Promise<void> {
    try {
      const [resource] = await this.dataSource.manager.find(Resource, {
        where: {
          id: resourceId,
        },
      })
      if (!resource) {
        throw new Error("Resource not found");
      }
      const scenario = await this.getScenario(scenarioId);
      scenario.resources = scenario.resources.filter((r: IResource) => {
        return r.id !== resourceId
      })
      await this.dataSource.manager.save(Scenario, scenario);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async updateScenario(id: string, data: UpdateScenarioRequestDTO): Promise<void> {
    try {
      await this.dataSource.manager.update(Scenario, { id }, data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async deleteScenario(id: string): Promise<void> {
    try {
      await this.dataSource.manager.delete(Scenario, id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
