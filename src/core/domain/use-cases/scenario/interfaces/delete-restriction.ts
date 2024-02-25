export interface DeleteRestrictionUseCase {
    execute(id: number | string): Promise<void>;
}