export interface DeleteEpisodeUseCase {
    execute(id: number | string): Promise<void>;
}