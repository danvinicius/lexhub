import { ISymbol } from "../../../domain/entities/symbol";

export interface UpdateSymbolUseCase {
    execute(id: string | number, symbol: ISymbol): Promise<void>
}