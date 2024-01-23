import { Symbol } from "../../../entities/symbol";

export interface CreateSymbolUseCase {
    execute(symbol: Symbol): Promise<string | number>;
}