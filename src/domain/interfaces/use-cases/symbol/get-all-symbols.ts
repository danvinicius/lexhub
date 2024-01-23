import { Symbol } from "../../../entities/symbol";

export interface GetAllSymbolsUseCase {
    execute(): Promise<Symbol[]>
}