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

export interface IUser {
  readonly id?: number;
  name: string;
  email: string;
  password: string;
  validated: boolean;
  projects?: IUserProject[];
}

export enum IUserRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  COLLABORATOR = "COLLABORATOR",
  OBSERVER = "OBSERVER",
}

export interface IUserProject {
  readonly id?: number;
  removedBy: number;
  role: IUserRole;
  user: IUser;
  project: IProject;
}

export interface IProject {
  readonly id?: number;
  name: string;
  description: string;
  scenarios?: ILexiconScenario[];
  symbols: ISymbol[];
  users: IUserProject[];
}

export interface ISymbol {
  readonly id?: number;
  name: string;
  classification: string;
  notion?: string;
  synonyms?: ISynonym[];
  impacts?: IImpact[];
  project: IProject;
}

export interface ISynonym {
  readonly id?: number;
  name: string;
}

export interface IImpact {
  readonly id?: number;
  description: string;
}

export interface IGroup {
  readonly id?: number;
  position: number;
  nonSequentialEpisodes: INonSequentialEpisode[];
}

export interface IEpisode {
  readonly id?: number;
  position: number;
  description: string;
  type: string;
  restriction?: IRestriction;
}

export interface IRestriction {
  readonly id?: number;
  description: string;
}

export interface IContext {
  readonly id?: number;
  geographicLocation: string;
  temporalLocation: string;
  preCondition: string;
  restrictions?: IRestriction[];
}

export interface INonSequentialEpisode extends IEpisode {
  readonly id?: number;
  group: IGroup;
}

export interface IActor {
  readonly id?: number;
  name: string;
}

export interface IResource {
  readonly id?: number;
  name: string;
  restrictions?: IRestriction[];
}

export interface IException {
  readonly id?: number;
  description: string;
}

export interface LexiconInfo {
  resource: string;
  name: string;
  starts: number;
  ends: number;
  type: string;
}

export interface Lexicon {
  content: string;
  foundLexicons: LexiconInfo[];
}

export interface ILexiconScenario {
  id: number;
  title: Lexicon;
  goal: Lexicon;
  context: {
    geographicLocation: Lexicon;
    temporalLocation: Lexicon;
    preCondition: Lexicon;
    restrictions: {
      description: Lexicon;
    }[];
  };
  exceptions: {
    description: Lexicon;
  }[];
  actors: {
    name: Lexicon;
  }[];
  resources: {
    name: Lexicon;
  }[];
  episodes: {
    position: number;
    restriction: IRestriction;
    description: Lexicon;
  }[];
  groups: {
    position: number;
    nonSequentialEpisodes: {
      restriction: IRestriction;
      description: Lexicon;
    }[];
  }[];
}
