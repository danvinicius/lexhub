import { AddSynonymRequestDTO } from "../../../../../application/dtos/add-synonym-request-dto";
import { ISymbol } from "../../../entities/symbol";

export interface AddSynonymUseCase {
    execute(synonym: AddSynonymRequestDTO): Promise<void>;
}