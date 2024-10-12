import Project from '@/models/Project';
import Scenario, {
  IScenario,
  IResource,
  Restriction,
  Resource,
  IActor,
  IContext,
  IException,
  IRestriction,
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
    resources?: string[];
  }
}

export class ScenarioRepository {
  async getScenario(id: string): Promise<IScenario | null> {
    const scenario = await Scenario.findById(id)
      .populate('resources')
      .populate('context.restrictions')
      .populate('episodes.restriction')
      .exec();
    return scenario?.toJSON();
  }

  async getAllScenarios(projectId: string): Promise<IScenario[]> {
    const scenarios = await Scenario.find({ project: projectId })
      .populate('resources')
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

export namespace ResourceRepository {
  export interface CreateResourceParams {
    name: string;
  }

  export interface UpdateResourceParams {
    restrictions: string[];
  }
}

export class ResourceRepository {
  async getResource(id: string): Promise<IResource | null> {
    try {
      const resource = await Resource.findById(id).exec();
      return resource?.toJSON();
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async createResource(
    data: ResourceRepository.CreateResourceParams
  ): Promise<IResource> {
    try {
      const resource = new Resource({
        name: data.name,
      });
      await resource.save();
      return resource.toJSON();
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async updateResource(
    id: string,
    data: ResourceRepository.UpdateResourceParams
  ): Promise<IResource> {
    try {
      await Resource.findByIdAndUpdate(id, {
        restrictions: data.restrictions
      });
      return await this.getResource(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteResource(id: string): Promise<void> {
    try {
      await Resource.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export namespace RestrictionRepository {
  export interface CreateRestrictionParams {
    description: string;
  }
}

export class RestrictionRepository {
  async getRestriction(id: string): Promise<IRestriction | null> {
    try {
      const restriction = await Restriction.findById(id).exec();
      return restriction?.toJSON();
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async createRestriction(
    data: RestrictionRepository.CreateRestrictionParams
  ): Promise<IRestriction> {
    try {
      const restriction = new Restriction({
        description: data.description,
      });
      await restriction.save();
      return await this.getRestriction(restriction.id);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async deleteRestriction(id: string): Promise<void> {
    try {
      await Restriction.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
