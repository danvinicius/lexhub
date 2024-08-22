import { IsNumber, IsString } from 'class-validator';

export class CreateActorRequestDTO {
  @IsString()
  name: string;

  @IsNumber()
  scenarioId: number;

  constructor(data: any) {
    this.name = data.name;
    this.scenarioId = data.scenarioId;
  }
}
