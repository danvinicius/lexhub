import { SymbolRequestDTO } from "../../../domain/dto/symbol-request-dto";
import { ISymbol } from "../../../domain/entities/symbol";

export interface CreateSymbolUseCase {
    execute(symbol: SymbolRequestDTO): Promise<ISymbol>;
}