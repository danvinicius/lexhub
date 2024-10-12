import { IContext, IActor, IException } from '@/models';
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

  @IsString()
  projectId: string;

  constructor(data: any) {
    this.title = data.title;
    this.goal = data.goal;
    this.context = data.context;
    this.projectId = data.projectId;
    this.actors = data.actors;
    this.exceptions = data.exceptions;
  }
}
