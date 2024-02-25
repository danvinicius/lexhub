export interface DeleteExceptionUseCase {
    execute(id: number | string): Promise<void>;
}