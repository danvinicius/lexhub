export interface DeleteScenarioUseCase {
  execute(id: string | number): Promise<void>;
}
