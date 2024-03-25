import { UseCase } from "../base-use-case";

export interface DeleteProject extends UseCase<number | string, void> {}