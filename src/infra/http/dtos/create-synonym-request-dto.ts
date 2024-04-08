import { IsNumber, IsString } from 'class-validator';

export class CreateSynonymRequestDTO {
  @IsString()
  name: string;

  @IsNumber()
  symbolId: number | string;

  constructor(data: any) {
    this.name = data.name;
    this.symbolId = data.symbolId;
  }
}
