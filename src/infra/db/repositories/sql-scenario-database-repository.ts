import { ScenarioRepository } from '@/infra/db/protocols';
import { DataSource } from 'typeorm';
import {
  Project,
  Scenario,
  Exception,
  Context,
  Restriction,
  Resource,
  NonSequentialEpisode,
  Actor,
  Episode,
  Group,
} from '@/infra/db/models';
import {
  IActor,
  IEpisode,
  INonSequentialEpisode,
  IResource,
  IScenario,
} from '@/entities';
import { BadRequestError, ServerError } from '@/util/errors';

export class SQLScenarioRepository implements ScenarioRepository {
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
          nonSequentialEpisodes: true,
        },
        project: true,
      },
    });
    delete scenario?.deletedAt;
    return scenario;
  }
  async getAllScenarios(projectId: number): Promise<Scenario[]> {
    const scenarios = await this.dataSource.manager.find(Scenario, {
      where: {
        project: {
          id: projectId,
        },
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
          nonSequentialEpisodes: true,
        },
        project: true
      },
    });
    return scenarios;
  }
  async createScenario(
    data: ScenarioRepository.CreateScenarioParams
  ): Promise<Scenario> {
    try {
      const [project] = await this.dataSource.manager.findBy(Project, {
        id: data.projectId as number,
      });
      const scenario = new Scenario();
      scenario.title = data.title;
      scenario.goal = data.goal;
      scenario.project = project;
      await this.dataSource.manager.save(Scenario, scenario);
      return scenario;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async createManyScenarios(
    data: ScenarioRepository.CreateManyScenariosParams
  ): Promise<IScenario[]> {
    try {
      const [project] = await this.dataSource.manager.findBy(Project, {
        id: data.projectId as number,
      });
      const scenarios = data.scenarios.map(
        (s: { title: string; goal: string }) => {
          const newScenario = new Scenario();
          newScenario.title = s.title;
          newScenario.goal = s.goal;
          newScenario.project = project;
          return newScenario;
        }
      );
      await this.dataSource.manager.save(Scenario, scenarios);
      return scenarios;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async createException(
    data: ScenarioRepository.CreateExceptionParams
  ): Promise<void> {
    try {
      const scenario = await this.getScenario(data?.scenarioId as number);
      const exception = new Exception();
      exception.description = data?.description;
      exception.scenario = scenario;
      await this.dataSource.manager.save(Exception, exception);
    } catch (error: any) {
      throw new ServerError('Error on creating exception');
    }
  }
  async createContext(
    data: ScenarioRepository.CreateContextParams
  ): Promise<void> {
    try {
      const scenario = await this.getScenario(data?.scenarioId as number);
      const context = new Context();
      context.geographicLocation = data?.geographicLocation;
      context.temporalLocation = data?.temporalLocation;
      context.preCondition = data?.preCondition;
      context.scenario = scenario;
      await this.dataSource.manager.save(Context, context);
    } catch (error: any) {
      throw new ServerError('Error on creating context');
    }
  }
  async createEpisode(
    data: ScenarioRepository.CreateEpisodeParams
  ): Promise<void> {
    try {
      const scenario = await this.getScenario(data?.scenarioId as number);
      const { description, type, position } = data;
      if (data?.group) {
        const [episodeWithSamePositionExists] =
          await this.dataSource.manager.find(Episode, {
            where: {
              position: data.group as number,
            },
          });
        if (episodeWithSamePositionExists) {
          throw new BadRequestError(
            'This position is already occupied by an episode'
          );
        }
        const nonSequentialEpisode = new NonSequentialEpisode();
        nonSequentialEpisode.description = description;
        nonSequentialEpisode.type = type;
        nonSequentialEpisode.position = position;
        await this.dataSource.manager.save(
          NonSequentialEpisode,
          nonSequentialEpisode
        );
        const [groupExists] = await this.dataSource.manager.find(Group, {
          where: {
            position: data.group as number,
          },
          relations: {
            nonSequentialEpisodes: true,
          },
        });

        if (groupExists) {
          if (
            groupExists.nonSequentialEpisodes.find(
              (nse: INonSequentialEpisode) =>
                nonSequentialEpisode.position == data.position
            )
          ) {
            throw new BadRequestError(
              'This position is already occupied by an non-sequential episode'
            );
          }
          groupExists.nonSequentialEpisodes.push(nonSequentialEpisode);
          await this.dataSource.manager.save(Group, groupExists);
          return;
        }
        const group = new Group();
        group.scenario = scenario;
        group.position = data.group as number;
        group.nonSequentialEpisodes = [nonSequentialEpisode];
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
      throw new ServerError(error.message);
    }
  }
  async createRestriction(
    data: ScenarioRepository.CreateRestrictionParams
  ): Promise<void> {
    try {
      const scenario = await this.getScenario(data?.scenarioId as number);
      const context = scenario.context;
      const resource = scenario.resources.find(
        (r: IResource) => r.id == data?.resourceId
      );
      const episode = scenario.episodes.find(
        (r: IEpisode) => r.id == data?.episodeId
      );
      const restriction = new Restriction();
      restriction.description = data?.description;
      restriction.context = context;
      if (data.resourceId && resource) {
        restriction.resource = resource;
      }
      if (data.episodeId && episode) {
        restriction.episode = episode;
      }
      await this.dataSource.manager.save(Restriction, restriction);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
  async deleteException(id: number): Promise<void> {
    try {
      const [exception] = await this.dataSource.manager.findBy(Exception, {
        id,
      });
      if (exception) {
        await this.dataSource.manager.delete(Exception, id);
      }
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
  async deleteContext(id: number): Promise<void> {
    try {
      const [context] = await this.dataSource.manager.findBy(Context, {
        id,
      });
      if (context) {
        await this.dataSource.manager.delete(Context, id);
      }
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
  async deleteRestriction(id: number): Promise<void> {
    try {
      const [restriction] = await this.dataSource.manager.findBy(Restriction, {
        id,
      });
      if (restriction) {
        await this.dataSource.manager.delete(Restriction, id);
      }
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  // Create and actor
  async createActor(data: ScenarioRepository.CreateActorParams): Promise<void> {
    try {
      const scenario = await this.getScenario(data?.scenarioId as number);
      const actor = new Actor();
      actor.name = data?.name;
      await this.dataSource.manager.save(Actor, actor);
      scenario.actors.push(actor);
      await this.dataSource.manager.save(Scenario, scenario);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  // Create and resource
  async createResource(
    data: ScenarioRepository.CreateResourceParams
  ): Promise<void> {
    try {
      const scenario = await this.getScenario(data?.scenarioId as number);
      const resource = new Resource();
      resource.name = data?.name;
      await this.dataSource.manager.save(Resource, resource);
      scenario.resources.push(resource);
      await this.dataSource.manager.save(Scenario, scenario);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  // Add an existing actor to a scenario
  async addActor(scenarioId: number, actorId: number): Promise<void> {
    try {
      const [actor] = await this.dataSource.manager.findBy(Actor, {
        id: actorId,
      });
      if (actor) {
        const scenario = await this.getScenario(scenarioId);
        scenario.actors.push(actor);
        await this.dataSource.manager.save(Scenario, scenario);
      }
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  // Add an existing resource to a scenario
  async addResource(scenarioId: number, resourceId: number): Promise<void> {
    try {
      const [resource] = await this.dataSource.manager.findBy(Resource, {
        id: resourceId,
      });
      if (resource) {
        const scenario = await this.getScenario(scenarioId);
        scenario.resources.push(resource);
        await this.dataSource.manager.save(Scenario, scenario);
      }
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async deleteActor(id: number): Promise<void> {
    try {
      const [actor] = await this.dataSource.manager.findBy(Actor, {
        id,
      });
      if (actor) {
        await this.dataSource.manager.delete(Actor, id);
      }
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async deleteResource(id: number): Promise<void> {
    try {
      const [resource] = await this.dataSource.manager.findBy(Resource, {
        id,
      });
      if (resource) {
        await this.dataSource.manager.delete(Resource, id);
      }
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async deleteEpisode(id: number): Promise<void> {
    try {
      const [episode] = await this.dataSource.manager.findBy(Episode, {
        id,
      });
      if (episode) {
        await this.dataSource.manager.delete(Episode, id);
      }
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async deleteGroup(id: number): Promise<void> {
    try {
      const [group] = await this.dataSource.manager.findBy(Group, {
        id,
      });
      if (group) {
        await this.dataSource.manager.delete(Group, id);
      }
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  // Remove an actor from a scenario
  async removeActor(scenarioId: number, actorId: number): Promise<void> {
    try {
      const [actor] = await this.dataSource.manager.find(Actor, {
        where: {
          id: actorId,
        },
      });
      if (actor) {
        const scenario = await this.getScenario(scenarioId);
        scenario.actors = scenario.actors.filter((a: IActor) => {
          return a.id !== actorId;
        });
        await this.dataSource.manager.save(Scenario, scenario);
      }
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  // Remove an resource from a scenario
  async removeResource(scenarioId: number, resourceId: number): Promise<void> {
    try {
      const [resource] = await this.dataSource.manager.find(Resource, {
        where: {
          id: resourceId,
        },
      });
      if (resource) {
        const scenario = await this.getScenario(scenarioId);
        scenario.resources = scenario.resources.filter((r: IResource) => {
          return r.id !== resourceId;
        });
        await this.dataSource.manager.save(Scenario, scenario);
      }
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
  async updateScenario(
    id: string,
    data: ScenarioRepository.UpdateScenarioParams
  ): Promise<void> {
    try {
      await this.dataSource.manager.update(Scenario, { id }, data);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
  async deleteScenario(id: string): Promise<void> {
    try {
      await this.dataSource.manager.softDelete(Scenario, id);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
}
