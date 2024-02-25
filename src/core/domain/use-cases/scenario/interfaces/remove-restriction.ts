export interface RemoveRestrictionUseCase {
    execute(id: number | string): Promise<void>;
}