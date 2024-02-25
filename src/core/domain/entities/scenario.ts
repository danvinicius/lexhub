import { IProject } from "./project";

export interface IScenario {
  readonly id?: number | string;
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
  id?: number | string;
  description: string;
}

export interface IActor {
  id?: number | string;
  name: string;
}

export interface IResource {
  id?: number | string;
  name: string;
  restrictions?: IRestriction[];
}

export interface IRestriction {
  id?: number | string;
  description: string;
}

export interface IContext {
  id?: number | string;
  geographicLocation: string;
  temporalLocation: string;
  preCondition: string;
  restrictions?: IRestriction[];
}

export interface IEpisode {
  id?: number | string;
  position: number;
  description: string;
  type: string;
  restriction?: IRestriction;
}

export interface IGroup {
  id?: number | string;
  position: number;
  nonSequentialEpisodes: INonSequentialEpisode[];
}

export interface INonSequentialEpisode extends IEpisode {
  id?: number | string;
  group: IGroup;
}
