import { UpdateSymbolRequestDTO } from "../../../domain/dto/update-symbol-request-dto";

export interface UpdateSymbolUseCase {
    execute(id: string | number, symbol: UpdateSymbolRequestDTO): Promise<void>
}