import { IContext, IActor, IException, IResource, IEpisode } from '@/models';
import { IsOptional, IsString } from 'class-validator';

export class UpdateScenarioRequestDTO {
  @IsString()
  title: string;

  @IsString()
  goal: string;

  @IsOptional()
  context: IContext;

  @IsOptional()
  actors: IActor[];

  @IsOptional()
  exceptions: IException[];

  @IsOptional()
  episodes: IEpisode[];

  @IsOptional()
  resources: IResource[];

  @IsString()
  projectId: String;

  constructor(data: any) {
    this.title = data.title;
    this.goal = data.goal;
    this.context = data.context;
    this.projectId = data.projectId;
    this.actors = data.actors;
    this.resources = data.resources;
    this.episodes = data.episodes;
    this.exceptions = data.exceptions;
  }
}
