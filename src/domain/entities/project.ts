import { Scenario } from "./scenario";
import { ISymbol } from "./symbol";

export interface IProject {
    readonly id?: number;
    name: string;
    description: string;
    scenarios?: Scenario[];
    symbols?: ISymbol[];
}