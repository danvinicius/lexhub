import { BadRequestError, ServerError } from '@/utils/errors';
import { Scenario, Project, IScenario, Exception, Context, Episode, NonSequentialEpisode, Group, INonSequentialEpisode, IResource, IEpisode, Restriction, Actor, Resource, IActor } from '@/models';
import dataSource, { initializeDataSource } from '@/infra/db/connection';

export namespace ScenarioRepository {
  export interface CreateScenarioParams {
    title: string;
    goal: string;
    projectId: number;
  }
  export interface CreateManyScenariosParams {
    scenarios: {
      title: string;
      goal: string;
    }[];
    projectId: number;
  }
  export interface CreateExceptionParams {
    description: string;
    scenarioId: number;
  }
  export interface CreateContextParams {
    geographicLocation: string;
    temporalLocation: string;
    preCondition: string;
    scenarioId: number;
  }
  export interface CreateRestrictionParams {
    description: string;
    scenarioId: number;
    episodeId: number;
    resourceId: number;
    contextId: number;
  }
  export interface CreateActorParams {
    name: string;
    scenarioId: number;
  }
  export interface CreateResourceParams {
    name: string;
    scenarioId: number;
  }
  export interface CreateEpisodeParams {
    position: number;
    description: string;
    type: string;
    group: number;
    scenarioId: number;
  }
  export interface UpdateScenarioParams {
    title: string;
    goal: string;
  }
}

export class ScenarioRepository {

  constructor() {
    initializeDataSource();
  }

  async getScenario(id: number): Promise<Scenario> {
    const [scenario] = await dataSource.manager.find(Scenario, {
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
    const scenarios = await dataSource.manager.find(Scenario, {
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
      const [project] = await dataSource.manager.findBy(Project, {
        id: data.projectId as number,
      });
      const scenario = new Scenario();
      scenario.title = data.title;
      scenario.goal = data.goal;
      scenario.project = project;
      await dataSource.manager.save(Scenario, scenario);
      return scenario;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async createManyScenarios(
    data: ScenarioRepository.CreateManyScenariosParams
  ): Promise<IScenario[]> {
    try {
      const [project] = await dataSource.manager.findBy(Project, {
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
      await dataSource.manager.save(Scenario, scenarios);
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
      await dataSource.manager.save(Exception, exception);
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
      await dataSource.manager.save(Context, context);
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
          await dataSource.manager.find(Episode, {
            where: {
              position: data.group as number,
            },
          });
        if (episodeWithSamePositionExists) {
          throw new BadRequestError(
            'Posição já ocupada por outro episódio'
          );
        }
        const nonSequentialEpisode = new NonSequentialEpisode();
        nonSequentialEpisode.description = description;
        nonSequentialEpisode.type = type;
        nonSequentialEpisode.position = position;
        await dataSource.manager.save(
          NonSequentialEpisode,
          nonSequentialEpisode
        );
        const [groupExists] = await dataSource.manager.find(Group, {
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
              'Posição já ocupada por outro episódio não sequencial'
            );
          }
          groupExists.nonSequentialEpisodes.push(nonSequentialEpisode);
          await dataSource.manager.save(Group, groupExists);
          return;
        }
        const group = new Group();
        group.scenario = scenario;
        group.position = data.group as number;
        group.nonSequentialEpisodes = [nonSequentialEpisode];
        await dataSource.manager.save(Group, group);
        return;
      }
      const episode = new Episode();
      episode.position = data?.position;
      episode.type = data?.type;
      episode.description = data?.description;
      episode.scenario = scenario;
      await dataSource.manager.save(Episode, episode);
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
      await dataSource.manager.save(Restriction, restriction);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
  async deleteException(id: number): Promise<void> {
    try {
      const [exception] = await dataSource.manager.findBy(Exception, {
        id,
      });
      if (exception) {
        await dataSource.manager.delete(Exception, id);
      }
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
  async deleteContext(id: number): Promise<void> {
    try {
      const [context] = await dataSource.manager.findBy(Context, {
        id,
      });
      if (context) {
        await dataSource.manager.delete(Context, id);
      }
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
  async deleteRestriction(id: number): Promise<void> {
    try {
      const [restriction] = await dataSource.manager.findBy(Restriction, {
        id,
      });
      if (restriction) {
        await dataSource.manager.delete(Restriction, id);
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
      await dataSource.manager.save(Actor, actor);
      scenario.actors.push(actor);
      await dataSource.manager.save(Scenario, scenario);
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
      await dataSource.manager.save(Resource, resource);
      scenario.resources.push(resource);
      await dataSource.manager.save(Scenario, scenario);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  // Add an existing actor to a scenario
  async addActor(scenarioId: number, actorId: number): Promise<void> {
    try {
      const [actor] = await dataSource.manager.findBy(Actor, {
        id: actorId,
      });
      if (actor) {
        const scenario = await this.getScenario(scenarioId);
        scenario.actors.push(actor);
        await dataSource.manager.save(Scenario, scenario);
      }
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  // Add an existing resource to a scenario
  async addResource(scenarioId: number, resourceId: number): Promise<void> {
    try {
      const [resource] = await dataSource.manager.findBy(Resource, {
        id: resourceId,
      });
      if (resource) {
        const scenario = await this.getScenario(scenarioId);
        scenario.resources.push(resource);
        await dataSource.manager.save(Scenario, scenario);
      }
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async deleteActor(id: number): Promise<void> {
    try {
      const [actor] = await dataSource.manager.findBy(Actor, {
        id,
      });
      if (actor) {
        await dataSource.manager.delete(Actor, id);
      }
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async deleteResource(id: number): Promise<void> {
    try {
      const [resource] = await dataSource.manager.findBy(Resource, {
        id,
      });
      if (resource) {
        await dataSource.manager.delete(Resource, id);
      }
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async deleteEpisode(id: number): Promise<void> {
    try {
      const [episode] = await dataSource.manager.findBy(Episode, {
        id,
      });
      if (episode) {
        await dataSource.manager.delete(Episode, id);
      }
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async deleteGroup(id: number): Promise<void> {
    try {
      const [group] = await dataSource.manager.findBy(Group, {
        id,
      });
      if (group) {
        await dataSource.manager.delete(Group, id);
      }
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  // Remove an actor from a scenario
  async removeActor(scenarioId: number, actorId: number): Promise<void> {
    try {
      const [actor] = await dataSource.manager.find(Actor, {
        where: {
          id: actorId,
        },
      });
      if (actor) {
        const scenario = await this.getScenario(scenarioId);
        scenario.actors = scenario.actors.filter((a: IActor) => {
          return a.id !== actorId;
        });
        await dataSource.manager.save(Scenario, scenario);
      }
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  // Remove an resource from a scenario
  async removeResource(scenarioId: number, resourceId: number): Promise<void> {
    try {
      const [resource] = await dataSource.manager.find(Resource, {
        where: {
          id: resourceId,
        },
      });
      if (resource) {
        const scenario = await this.getScenario(scenarioId);
        scenario.resources = scenario.resources.filter((r: IResource) => {
          return r.id !== resourceId;
        });
        await dataSource.manager.save(Scenario, scenario);
      }
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
  async updateScenario(
    id: number,
    data: ScenarioRepository.UpdateScenarioParams
  ): Promise<void> {
    try {
      await dataSource.manager.update(Scenario, { id }, data);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
  async deleteScenario(id: number): Promise<void> {
    try {
      await dataSource.manager.softDelete(Scenario, id);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
}
