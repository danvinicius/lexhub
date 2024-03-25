import { UseCase } from "../base-use-case";

export interface DeleteSymbol extends UseCase<number | string, void> {}