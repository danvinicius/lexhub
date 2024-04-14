import { IsString } from 'class-validator';

export class UpdateScenarioRequestDTO {
  @IsString()
  title: string;

  @IsString()
  goal: string;

  constructor(data: any) {
    this.title = data.title;
    this.goal = data.goal;
  }
}
