import { UseCase } from "../base-use-case";

export interface DeleteContext extends UseCase<number | string, void> {}