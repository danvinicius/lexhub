import { ISymbol } from "@/domain/entities";
import { UseCase } from "../base-use-case";

export interface GetAllSymbols extends UseCase<number | string, ISymbol[]> {}