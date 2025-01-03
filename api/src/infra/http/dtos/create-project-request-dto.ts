import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectRequestDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  private: boolean;

  constructor(data: any) {
    this.name = data.name;
    this.description = data.description;
    this.private = data.private;
  }
}
