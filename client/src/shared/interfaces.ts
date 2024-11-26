export interface ErrorResponse {
    error: string;
}

export interface IScenario {
    readonly id?: string;
    title: string;
    goal: string;
    exceptions?: IException[];
    resources?: IResource[];
    actors?: IActor[];
    context?: IContext;
    episodes?: IEpisode[];
    project: string;
}

export interface IUser {
    readonly id?: string;
    name: string;
    email: string;
    imageUrl?: string;
    password: string;
    validated: boolean;
    projects?: IUserProject[];
}

export enum IUserRole {
    OWNER = 'OWNER',
    ADMIN = 'ADMIN',
    COLLABORATOR = 'COLLABORATOR',
    OBSERVER = 'OBSERVER',
}

export interface IUserProject {
    readonly id?: string;
    removedBy: number;
    role: IUserRole;
    user: IUser;
    project: IProject;
}

export interface IProject {
    readonly id?: string;
    name: string;
    description: string;
    scenarios?: ILexiconScenario[];
    symbols: ISymbol[];
    users: IUserProject[];
    createdAt: string;
}

export interface ISymbol {
    readonly id?: string;
    name: string;
    classification: string;
    notion?: string;
    synonyms?: ISynonym[];
    impacts?: IImpact[];
    project: string;
}

export interface ISynonym {
    name: string;
}

export interface IImpact {
    description: string;
}

export interface IEpisode {
    readonly id: string;
    position: number;
    description?: string;
    type?: string;
    restriction?: string;
    nonSequentialEpisodes?: {
        id: string;
        type: string;
        description: string;
        restriction: string;
    }[];
}

export interface IRestriction {
    description: string;
}

export interface IContext {
    geographicLocation?: string;
    temporalLocation?: string;
    preCondition?: string;
    restrictions?: IRestriction[];
}

export interface IActor {
    name: string;
}

export interface IResource {
    readonly id?: string;
    name: string;
    restrictions?: IRestriction[];
}

export interface IException {
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

export interface ILexiconEpisode {
    id: string;
    position: number;
    description: Lexicon;
    type: string;
    restriction: Lexicon;
    nonSequentialEpisodes?: {
        id: string;
        type: string;
        description: Lexicon;
        restriction: Lexicon;
    }[];
}

export interface ILexiconScenario {
    id: string;
    title: Lexicon;
    goal: Lexicon;
    context: {
        geographicLocation: Lexicon;
        temporalLocation: Lexicon;
        preCondition: Lexicon;
        restrictions: {
            id: string;
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
        id: string;
        name: Lexicon;
        restrictions: {
            id: string;
            description: Lexicon;
        }[];
    }[];
    episodes: ILexiconEpisode[];
    groups: {
        position: number;
        nonSequentialEpisodes: {
            restriction: IRestriction;
            description: Lexicon;
        }[];
    }[];
    projectId: string;
}
