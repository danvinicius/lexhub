import { UpdateSymbolRequestDTO } from "../../../../../application/http/dtos/update-symbol-request-dto";

export interface UpdateSymbolUseCase {
    execute(id: number | string, symbol: UpdateSymbolRequestDTO): Promise<void>
}