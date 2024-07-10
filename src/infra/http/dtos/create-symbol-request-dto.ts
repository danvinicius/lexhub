import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSymbolRequestDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  classification: string;

  @IsString()
  @IsOptional()
  notion: string;

  @IsNumber()
  projectId: number;

  constructor(data: any) {
    this.name = data.name;
    this.classification = data.classification;
    this.notion = data.notion;
    this.projectId = data.projectId;
  }
}
