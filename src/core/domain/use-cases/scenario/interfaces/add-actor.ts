export interface AddActorUseCase {
    execute(scenarioId: number | string, actorId: number | string): Promise<void>;
}