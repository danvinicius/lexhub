export interface DeleteSymbolUseCase {
    execute(id: string): Promise<void>
}