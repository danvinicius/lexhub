export interface DeleteActorUseCase {
    execute(id: number | string): Promise<void>;
}