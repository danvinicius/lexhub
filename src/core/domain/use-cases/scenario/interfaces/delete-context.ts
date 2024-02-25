export interface DeleteContextUseCase {
    execute(id: number | string): Promise<void>;
}