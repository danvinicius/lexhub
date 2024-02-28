export interface DeleteGroupUseCase {
    execute(id: number | string): Promise<void>;
}