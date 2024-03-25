import { UseCase } from "../base-use-case";

export interface DeleteScenario extends UseCase<number | string, void> {}