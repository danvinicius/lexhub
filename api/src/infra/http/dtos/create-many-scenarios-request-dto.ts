import { IsArray, IsString } from 'class-validator';

export class CreateManyScenariosRequestDTO {
  @IsArray()
  scenarios: {
    title: string;
    goal: string;
  }[];

  @IsString()
  projectId: String;

  constructor(data: any) {
    this.scenarios = data.scenarios;
    this.projectId = data.projectId;
  }
}
