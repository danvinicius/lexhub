import { Scenario } from "./scenario";

export interface Project {
    readonly id?: string;
    name: string;
    description: string;
    scenarios?: Scenario[];
    symbols?: Symbol[];
}