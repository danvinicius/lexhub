export interface RemoveImpactUseCase {
    execute(id: number | string): Promise<void>;
}