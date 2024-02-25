export interface RemoveActorUseCase {
    execute(actorId: number | string, scenarioId: number | string): Promise<void>;
}