import { UpdateSymbolRequestDTO } from "../../../../../application/http/dtos/update-symbol-request-dto";

export interface UpdateSymbolUseCase {
    execute(id: string | number, symbol: UpdateSymbolRequestDTO): Promise<void>
}