export interface DeleteSynonymUseCase {
    execute(id: number | string): Promise<void>;
}