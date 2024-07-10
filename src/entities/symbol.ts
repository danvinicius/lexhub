import { IProject } from './project';

export interface ISymbol {
  id?: number;
  name: string;
  classification: string;
  notion?: string;
  synonyms?: ISynonym[];
  impacts?: IImpact[];
  project: IProject;
}

export interface ISynonym {
  id?: number;
  name: string;
}

export interface IImpact {
  id?: number;
  description: string;
}
