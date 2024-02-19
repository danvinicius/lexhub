import { AddImpactRequestDTO } from "../../../../../application/dtos/add-impact-request-dto";

export interface AddImpactUseCase {
    execute(impact: AddImpactRequestDTO): Promise<void>;
}