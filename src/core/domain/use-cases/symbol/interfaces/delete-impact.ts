export interface DeleteImpactUseCase {
    execute(id: number | string): Promise<void>;
}