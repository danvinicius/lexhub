import { IContext, IActor, IException, IResource, IEpisode } from './interfaces';

export interface ProjectRequestDTO {
    name: string;
    description: string;
    private: boolean;
}

export interface ScenarioRequestDTO {
    title?: string;
    goal?: string;
    context?: IContext;
    actors?: IActor[];
    exceptions?: IException[];
    resources?: IResource[];
    episodes?: IEpisode[];
    projectId: string;
}

export interface SymbolRequestDTO {
    name: string;
    notion: string;
    classification: string;
    synonyms?: {
        name: string;
    }[];

    impacts?: {
        description: string;
    }[];
    projectId: string;
}

export interface AddUserRequestDTO {
    email: string;
    role: string;
    projectId: string;
}

export interface UserRoleRequestDTO {
    userId: string;
    newRole: string;
    projectId: string;
}

export interface RemoveUserRequestDTO {
    userId: string;
    projectId: string;
}
