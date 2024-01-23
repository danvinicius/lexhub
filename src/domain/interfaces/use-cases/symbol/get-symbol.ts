import { Symbol } from "../../../entities/symbol";

export interface GetSymbolUseCase {
    execute(id: string | number): Promise<null | Symbol>
}