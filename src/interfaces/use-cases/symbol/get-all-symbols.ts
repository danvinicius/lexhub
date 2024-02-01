import { ISymbol } from "../../../domain/entities/symbol";

export interface GetAllSymbolsUseCase {
    execute(): Promise<ISymbol[]>
}