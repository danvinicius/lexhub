import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateContextRequestDTO } from './create-context-request-dto';
import { CreateActorRequestDTO } from './create-actor-request-dto';
import { CreateExceptionRequestDTO } from './create-exception-request-dto';
import { CreateResourceRequestDTO } from './create-resource-request-dto';

export class CreateScenarioRequestDTO {
  @IsString()
  title: string;

  @IsString()
  goal: string;

  @ValidateNested()
  @Type(() => CreateContextRequestDTO)
  context: CreateContextRequestDTO;

  @ValidateNested()
  @Type(() => CreateActorRequestDTO)
  actors: CreateActorRequestDTO[];

  @ValidateNested()
  @Type(() => CreateExceptionRequestDTO)
  exceptions: CreateExceptionRequestDTO[];

  @ValidateNested()
  @Type(() => CreateResourceRequestDTO)
  resources: CreateResourceRequestDTO[];

  @IsNumber()
  projectId: number;

  constructor(data: any) {
    this.title = data.title;
    this.goal = data.goal;
    this.context = data.context;
    this.projectId = data.projectId;
    this.actors = data.actors;
    this.exceptions = data.exceptions;
    this.resources = data.resources;
  }
}
