export interface DeleteProjectUseCase {
  execute(id: number | string): Promise<void>;
}
