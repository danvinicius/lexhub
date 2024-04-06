import { IScenario } from "./scenario";
import { ISymbol } from "./symbol";
import { IUserProject } from "./user";

export interface IProject {
    readonly id?: number;
    name: string;
    description: string;
    scenarios?: IScenario[];
    symbols?: ISymbol[];
    users: IUserProject[]
}