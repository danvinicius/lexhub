import { IsNumber, IsString } from 'class-validator';

export class CreateContextRequestDTO {
  @IsString()
  geographicLocation: string;

  @IsString()
  temporalLocation: string;

  @IsString()
  preCondition: string;

  @IsNumber()
  scenarioId: number | string;

  constructor(data: any) {
    this.geographicLocation = data.geographicLocation;
    this.temporalLocation = data.temporalLocation;
    this.preCondition = data.preCondition;
    this.scenarioId = data.scenarioId;
  }
}
