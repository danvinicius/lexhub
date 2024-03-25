import { CreateEpisodeRequestDTO } from "@/presentation/http/dtos";
import { UseCase } from "../base-use-case";

export interface CreateEpisode
  extends UseCase<CreateEpisodeRequestDTO, void> {}