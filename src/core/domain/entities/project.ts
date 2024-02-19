import { IScenario } from "./scenario";
import { ISymbol } from "./symbol";

export interface IProject {
    readonly id?: number;
    name: string;
    description: string;
    scenarios?: IScenario[];
    symbols?: ISymbol[];
}