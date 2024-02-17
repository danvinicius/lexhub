import { AddImpactRequestDTO } from "../../../domain/dto/add-impact-request-dto";

export interface AddImpactUseCase {
    execute(impact: AddImpactRequestDTO): Promise<void>;
}