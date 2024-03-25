import { UseCase } from "../base-use-case";

export interface DeleteResource extends UseCase<number | string, void> {}