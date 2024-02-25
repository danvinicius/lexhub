export interface DeleteScenarioUseCase {
  execute(id: number | string): Promise<void>;
}
