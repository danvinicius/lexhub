import { CreateSynonymRequestDTO } from "../../../../../application/http/dtos/create-synonym-request-dto";
import { ISymbol } from "../../../entities/symbol";

export interface CreateSynonymUseCase {
    execute(synonym: CreateSynonymRequestDTO): Promise<void>;
}