import { CreateSymbolRequestDTO } from "../../../domain/dto/create-symbol-request-dto";
import { ISymbol } from "../../../domain/entities/symbol";

export interface CreateSymbolUseCase {
    execute(symbol: CreateSymbolRequestDTO): Promise<ISymbol>;
}