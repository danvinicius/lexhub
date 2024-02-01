export interface DeleteProjectUseCase {
  execute(id: string | number): Promise<void>;
}
