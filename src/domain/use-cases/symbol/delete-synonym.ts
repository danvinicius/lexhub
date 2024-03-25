import { UseCase } from "../base-use-case";

export interface DeleteSynonym extends UseCase<number | string, void> {}