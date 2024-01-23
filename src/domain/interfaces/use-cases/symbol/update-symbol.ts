import { Symbol } from "../../../entities/symbol";

export interface UpdateSymbolUseCase {
    execute(id: string | number, symbol: Symbol): Promise<void>
}