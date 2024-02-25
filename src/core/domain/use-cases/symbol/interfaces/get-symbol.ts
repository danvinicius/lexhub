import { ISymbol } from "../../../entities/symbol";

export interface GetSymbolUseCase {
    execute(id: number | string): Promise<null | ISymbol>
}