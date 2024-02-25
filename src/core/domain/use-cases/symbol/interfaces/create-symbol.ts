import { CreateSymbolRequestDTO } from "../../../../../application/http/dtos/create-symbol-request-dto";
import { ISymbol } from "../../../entities/symbol";

export interface CreateSymbolUseCase {
    execute(symbol: CreateSymbolRequestDTO): Promise<ISymbol>;
}