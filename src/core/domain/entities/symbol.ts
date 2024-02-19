import { IProject } from "./project";

export interface ISymbol {
    id?: string | number;
    name: string;
    classification: string;
    notion?: string;
    synonyms?: ISynonym[];
    impacts?: IImpact[];
    project: IProject;
}

export interface ISynonym {
    id?: string | number;
    name: string;
}

export interface IImpact {
    id?: string | number;
    description: string;
}