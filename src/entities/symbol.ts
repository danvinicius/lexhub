import { IProject } from './project';

export interface ISymbol {
  id?: number | string;
  name: string;
  classification: string;
  notion?: string;
  synonyms?: ISynonym[];
  impacts?: IImpact[];
  project: IProject;
}

export interface ISynonym {
  id?: number | string;
  name: string;
}

export interface IImpact {
  id?: number | string;
  description: string;
}
