import { ISymbol } from "../../../domain/entities/symbol";

export interface GetAllSymbolsUseCase {
    execute(projectId: number | string): Promise<ISymbol[]>
}