export interface DeleteProjectUseCase {
  execute(id: string): Promise<void>;
}
