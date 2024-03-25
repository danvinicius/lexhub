import { UseCase } from "../base-use-case";

export interface DeleteImpact extends UseCase<number | string, void> {}