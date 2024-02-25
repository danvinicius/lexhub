export interface RemoveContextUseCase {
    execute(id: number | string): Promise<void>;
}