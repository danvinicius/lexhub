import { IsNumber, IsString } from 'class-validator';

export class CreateExceptionRequestDTO {
  @IsString()
  description: string;

  @IsNumber()
  scenarioId: number;

  constructor(data: any) {
    this.description = data.description;
    this.scenarioId = data.scenarioId;
  }
}
