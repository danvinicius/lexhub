export interface RemoveSynonymUseCase {
    execute(id: number | string): Promise<void>;
}