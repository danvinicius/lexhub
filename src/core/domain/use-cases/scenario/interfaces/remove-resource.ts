export interface RemoveResourceUseCase {
    execute(resourceId: number | string, scenarioId: number | string): Promise<void>;
}