export interface AddResourceUseCase {
    execute(scenarioId: number | string, actorId: number | string): Promise<void>;
}