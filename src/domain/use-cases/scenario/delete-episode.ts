import { UseCase } from "../base-use-case";

export interface DeleteEpisode extends UseCase<number | string, void> {}