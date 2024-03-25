import { UseCase } from "../base-use-case";

export interface DeleteGroup extends UseCase<number | string, void> {}