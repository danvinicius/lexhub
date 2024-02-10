import { IProject } from "./project";

export interface IScenario {
  readonly id?: string | number;
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
  id?: string | number;
  description: string;
}

export interface IActor {
  id?: string | number;
  name: string;
}

export interface IResource {
  id?: string | number;
  name: string;
  restrictions?: IRestriction[];
}

export interface IRestriction {
  id?: string | number;
  description: string;
}

export interface IContext {
  id?: string | number;
  geographicLocation: string;
  temporalLocation: string;
  preCondition: string;
  restrictions?: IRestriction[];
}

export interface IEpisode {
  id?: string | number;
  position: number;
  description: string;
  type: string;
  restriction?: IRestriction;
}

export interface IGroup {
  id?: string | number;
  position: number;
  nonSequentialEpisodes: INonSequentialEpisode[];
}

export interface INonSequentialEpisode extends IEpisode {
  id?: string | number;
  group: IGroup;
}
