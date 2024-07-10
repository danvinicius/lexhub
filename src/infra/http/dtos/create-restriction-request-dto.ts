import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRestrictionRequestDTO {
  @IsString()
  description: string;

  @IsNumber()
  scenarioId: number;

  @IsNumber()
  @IsOptional()
  episodeId: number;

  @IsOptional()
  @IsNumber()
  resourceId: number;

  @IsOptional()
  @IsNumber()
  contextId: number;

  constructor(data: any) {
    this.description = data.description;
    this.scenarioId = data.scenarioId;
    this.resourceId = data.resourceId;
    this.episodeId = data.episodeId;
    this.contextId = data.contextId;
  }
}
