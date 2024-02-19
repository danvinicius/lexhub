import { ISymbol } from "../../../entities/symbol";

export interface GetSymbolUseCase {
    execute(id: string | number): Promise<null | ISymbol>
}