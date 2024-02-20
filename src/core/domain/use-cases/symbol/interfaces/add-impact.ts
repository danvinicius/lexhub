import { AddImpactRequestDTO } from "../../../../../application/http/dtos/add-impact-request-dto";

export interface AddImpactUseCase {
    execute(impact: AddImpactRequestDTO): Promise<void>;
}