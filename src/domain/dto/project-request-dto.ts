import { IsNotEmpty, IsString } from "class-validator";

export class ProjectRequestDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  constructor(data: any) {
    this.name = data.name;
    this.description = data.description;
  }
}
