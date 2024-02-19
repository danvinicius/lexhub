import { ISymbol } from "../../../entities/symbol";

export interface GetAllSymbolsUseCase {
    execute(projectId: number | string): Promise<ISymbol[]>
}