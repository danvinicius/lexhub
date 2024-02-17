import { AddSynonymRequestDTO } from "../../../domain/dto/add-synonym-request-dto";
import { ISymbol } from "../../../domain/entities/symbol";

export interface AddSynonymUseCase {
    execute(synonym: AddSynonymRequestDTO): Promise<void>;
}