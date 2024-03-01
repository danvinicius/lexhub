export interface DeleteResourceUseCase {
    execute(id: number | string): Promise<void>;
}