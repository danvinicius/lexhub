import { IProject } from './project';

export interface IScenario {
  readonly id?: number;
  title: string;
  goal: string;
  exceptions?: IException[];
  resources?: IResource[];
  actors?: IActor[];
  context?: IContext;
  episodes?: IEpisode[];
  groups?: IGroup[];
  project: IProject;
}

export interface IException {
  id?: number;
  description: string;
}

export interface IActor {
  id?: number;
  name: string;
}

export interface IResource {
  id?: number;
  name: string;
  restrictions?: IRestriction[];
}

export interface IRestriction {
  id?: number;
  description: string;
}

export interface IContext {
  id?: number;
  geographicLocation: string;
  temporalLocation: string;
  preCondition: string;
  restrictions?: IRestriction[];
}

export interface IEpisode {
  id?: number;
  position: number;
  description: string;
  type: string;
  restriction?: IRestriction;
}

export interface IGroup {
  id?: number;
  position: number;
  nonSequentialEpisodes: INonSequentialEpisode[];
}

export interface INonSequentialEpisode extends IEpisode {
  id?: number;
  group: IGroup;
}
