import { IsNumber, IsString } from 'class-validator';

export class CreateResourceRequestDTO {
  @IsString()
  name: string;

  @IsNumber()
  scenarioId: number;

  constructor(data: any) {
    this.name = data.name;
    this.scenarioId = data.scenarioId;
  }
}
