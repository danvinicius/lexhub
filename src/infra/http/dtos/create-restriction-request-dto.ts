import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRestrictionRequestDTO {
  @IsString()
  description: string;

  @IsNumber()
  scenarioId: number | string;

  @IsNumber()
  @IsOptional()
  episodeId: number | string;

  @IsOptional()
  @IsNumber()
  resourceId: number | string;

  @IsOptional()
  @IsNumber()
  contextId: number | string;

  constructor(data: any) {
    this.description = data.description;
    this.scenarioId = data.scenarioId;
    this.resourceId = data.resourceId;
    this.episodeId = data.episodeId;
    this.contextId = data.contextId;
  }
}
