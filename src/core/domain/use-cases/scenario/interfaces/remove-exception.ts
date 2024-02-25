export interface RemoveExceptionUseCase {
    execute(id: number | string): Promise<void>;
}