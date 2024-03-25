import { ISymbol } from "@/domain/entities";
import { CreateSymbolRequestDTO } from "@/presentation/http/dtos";
import { UseCase } from "../base-use-case";

export interface CreateSymbol
  extends UseCase<CreateSymbolRequestDTO, ISymbol> {}