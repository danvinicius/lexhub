import { IsOptional, IsString } from 'class-validator';

export class CreateRestrictionRequestDTO {
  @IsString()
  id: string;

  @IsString()
  description: string;

  @IsString()
  scenarioId: string;

  @IsString()
  @IsOptional()
  episodeId: string;

  @IsOptional()
  @IsString()
  resourceId: string;

  @IsOptional()
  @IsString()
  contextId: string;

  constructor(data: any) {
    this.id = data.id;
    this.description = data.description;
    this.scenarioId = data.scenarioId;
    this.resourceId = data.resourceId;
    this.episodeId = data.episodeId;
    this.contextId = data.contextId;
  }
}
