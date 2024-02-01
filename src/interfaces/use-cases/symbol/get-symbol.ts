import { ISymbol } from "../../../domain/entities/symbol";

export interface GetSymbolUseCase {
    execute(id: string | number): Promise<null | ISymbol>
}