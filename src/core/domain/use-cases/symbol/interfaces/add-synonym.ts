import { AddSynonymRequestDTO } from "../../../../../application/http/dtos/add-synonym-request-dto";
import { ISymbol } from "../../../entities/symbol";

export interface AddSynonymUseCase {
    execute(synonym: AddSynonymRequestDTO): Promise<void>;
}