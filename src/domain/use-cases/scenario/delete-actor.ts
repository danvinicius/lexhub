import { UseCase } from "../base-use-case";

export interface DeleteActor extends UseCase<number | string, void> {}