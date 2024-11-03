import Project from '@/models/Project';
import Scenario, {
  IScenario,
  IActor,
  IContext,
  IException,
  IResource,
  IEpisode,
} from '@/models/Scenario';
import { ServerError } from '@/utils/errors';

export namespace ScenarioRepository {
  export interface CreateScenarioParams {
    title: string;
    goal: string;
    context: IContext;
    actors: IActor[];
    exceptions: IException[];
    projectId: string;
  }
  export interface CreateManyScenariosParams {
    scenarios: {
      title: string;
      goal: string;
    }[];
    projectId: string;
  }
  export interface CreateExceptionParams {
    description: string;
    scenarioId: string;
  }
  export interface CreateContextParams {
    geographicLocation: string;
    temporalLocation: string;
    preCondition: string;
    scenarioId: string;
  }
  export interface CreateRestrictionParams {
    description: string;
    scenarioId: string;
    episodeId: string;
    resourceId: string;
    contextId: string;
  }
  export interface CreateActorParams {
    name: string;
    scenarioId: string;
  }
  export interface CreateResourceParams {
    name: string;
    scenarioId: string;
  }
  export interface CreateEpisodeParams {
    position: number;
    description: string;
    type: string;
    group: number;
    scenarioId: string;
  }
  export interface UpdateScenarioParams {
    title: string;
    goal: string;
    context?: IContext;
    actors?: IActor[];
    exceptions?: IException[];
    resources?: IResource[];
    episodes: IEpisode[];
  }
}

export class ScenarioRepository {
  async getScenario(id: string): Promise<IScenario | null> {
    const scenario = await Scenario.findById(id)
      .populate({
      path: 'resources', // Popula os recursos
      populate: {
        path: 'restrictions', // Popula as restrições dentro de cada recurso
      },
    })
      .populate('context.restrictions')
      .populate('episodes.restriction')
      .exec();
    return scenario?.toJSON();
  }

  async getAllScenarios(projectId: string): Promise<IScenario[]> {
    const scenarios = await Scenario.find({ project: projectId })
      .populate({
      path: 'resources', // Popula os recursos
      populate: {
        path: 'restrictions', // Popula as restrições dentro de cada recurso
      },
    })
      .populate('context.restrictions')
      .populate('episodes.restriction')
      .exec();
    return scenarios.map((scenario) => scenario.toJSON());
  }

  async createScenario(
    data: ScenarioRepository.CreateScenarioParams
  ): Promise<IScenario> {
    try {
      const project = await Project.findById(data.projectId);
      if (!project) throw new ServerError('Project not found');
      const scenario = new Scenario({
        title: data.title,
        goal: data.goal,
        context: data.context,
        project: data.projectId,
        actors: data.actors,
        exceptions: data.exceptions,
      });
      await scenario.save();

      await Project.findByIdAndUpdate(
        project.id,
        {
          $push: {
            scenarios: scenario,
          },
        },
        { new: true }
      );

      return scenario.toJSON();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createManyScenarios(
    data: ScenarioRepository.CreateManyScenariosParams
  ): Promise<IScenario[]> {
    try {
      const scenarios = data.scenarios.map((s) => ({
        title: s.title,
        goal: s.goal,
        project: data.projectId,
      }));
      const result = await Scenario.insertMany(scenarios);
      return (await Scenario.populate(result, { path: 'project' })).map(
        (scenario) => scenario.toJSON()
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateScenario(
    id: string,
    data: ScenarioRepository.UpdateScenarioParams
  ): Promise<IScenario> {
    
    try {
      await Scenario.findByIdAndUpdate(id, {
        title: data.title,
        goal: data.goal,
        exceptions: data.exceptions,
        actors: data.actors,
        context: data.context,
        resources: data.resources,
        episodes: data.episodes,
      });
      return await this.getScenario(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteScenario(id: string): Promise<void> {
    try {
      await Scenario.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}