import { IsNumber, IsString } from 'class-validator';

export class CreateScenarioRequestDTO {
  @IsString()
  title: string;

  @IsString()
  goal: string;

  @IsNumber()
  projectId: number;

  constructor(data: any) {
    this.title = data.title;
    this.goal = data.goal;
    this.projectId = data.projectId;
  }
}
