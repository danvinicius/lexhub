import { CreateImpactRequestDTO } from "../../../../../application/http/dtos/create-impact-request-dto";

export interface CreateImpactUseCase {
    execute(impact: CreateImpactRequestDTO): Promise<void>;
}