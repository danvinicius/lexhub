import { ISymbol } from "@/domain/entities";
import { UseCase } from "../base-use-case";

export interface GetSymbol
  extends UseCase<number | string, null | ISymbol> {}