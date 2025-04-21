export interface ErrorResponse {
    error: string;
}

export interface IScenario {
    readonly id?: string;
    title: string;
    goal?: string;
    exceptions?: IException[];
    resources?: IResource[];
    actors?: IActor[];
    context?: IContext;
    episodes?: IEpisode[];
    project: string;
}

export interface IUser {
    readonly id: string;
    name: string;
    email: string;
    imageUrl?: string;
    password: string;
    validated: boolean;
    projects?: IUserProject[];
}

export enum IUserRole {
    PROPRIETARIO = 'Proprietario',
    ADMINISTRADOR = 'Administrador',
    COLABORADOR = 'Colaborador',
    OBSERVADOR = 'Observador',
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
    private: boolean;
    scenarios?: ILexiconScenario[];
    symbols: ILexiconSymbol[];
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

export interface INonSequentialEpisode {
    id: string;
    type: string;
    description: string;
    restriction: string;
}

export interface IEpisode {
    readonly id: string;
    position: number;
    description?: string;
    type?: string;
    restriction?: string;
    nonSequentialEpisodes?: INonSequentialEpisode[];
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

export interface ILexiconNonSequentialEpisode {
    id: string;
    type: string;
    description: Lexicon;
    restriction: Lexicon;
}

export interface ILexiconEpisode {
    id: string;
    position: number;
    description: Lexicon;
    type: string;
    restriction: Lexicon;
    nonSequentialEpisodes?: ILexiconNonSequentialEpisode[];
}

export interface ILexiconImpact {
    description: Lexicon;
}

export interface ILexiconSynonym {
    name: Lexicon;
}

export interface ILexiconSymbol {
    id: string;
    name: string;
    notion: Lexicon;
    classification: string;
    impacts: ILexiconImpact[];
    synonyms: ILexiconSynonym[];
    projectId: string;
}

export interface ILexiconContext {
    geographicLocation: Lexicon;
    temporalLocation: Lexicon;
    preCondition: Lexicon;
    restrictions: ILexiconRestriction[];
}

export interface ILexiconRestriction {
    id: string;
    description: Lexicon;
}

export interface ILexiconResource {
    id: string;
    name: Lexicon;
    restrictions: ILexiconRestriction[];
}

export interface ILexiconException {
    description: Lexicon;
}

export interface ILexiconActor {
    name: Lexicon;
}

export interface ILexiconScenario {
    id: string;
    title: Lexicon;
    goal: Lexicon;
    context: ILexiconContext;
    exceptions: ILexiconException[];
    actors: ILexiconActor[];
    resources: ILexiconResource[];
    episodes: ILexiconEpisode[];
    projectId: string;
}

export type DifferenceKind = 'N' | 'D' | 'E' | 'A';

export interface IDifference {
    kind: DifferenceKind;
    path: string[];
    lhs?: string | number | object;
    rhs?: string | number | object;
    index?: number;
    item?: IDifference;
}

export interface IChange {
    readonly id?: string;
    differences: IDifference[];
    responsible: IUser;
    entityName: string;
    project: IProject;
    createdAt: string;
}
