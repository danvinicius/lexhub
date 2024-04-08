import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSymbolRequestDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  classification: string;

  @IsString()
  @IsOptional()
  notion: string;

  constructor(data: any) {
    this.name = data.name;
    this.classification = data.classification;
    this.notion = data.notion;
  }
}
