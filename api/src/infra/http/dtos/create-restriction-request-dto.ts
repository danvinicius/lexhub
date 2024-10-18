import { IsOptional, IsString } from 'class-validator';

export class CreateRestrictionRequestDTO {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  description: string;

  @IsString()
  scenarioId: string;

  @IsOptional()
  @IsString()
  resourceId: string;

  @IsString()
  @IsOptional()
  episodeId: string;

  constructor(data: any) {
    this.id = data.id;
    this.description = data.description;
    this.scenarioId = data.scenarioId;
    this.resourceId = data.resourceId;
    this.episodeId = data.episodeId;
  }
}
