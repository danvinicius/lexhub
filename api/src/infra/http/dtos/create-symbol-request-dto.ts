import "reflect-metadata";
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

export class SynonymDTO {
  @IsString()
  name: string;

  constructor(data: any) {
    this.name = data.name;
  }
}

export class ImpactDTO {
  @IsString()
  description: string;

  constructor(data: any) {
    this.description = data.description;
  }
}

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

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => SynonymDTO)
  synonyms: SynonymDTO[];
  
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => ImpactDTO)
  impacts: ImpactDTO[];

   // todo: synonyms and impacts validation not working

  @IsString()
  projectId: string;

  constructor(data: any) {
    this.name = data.name;
    this.classification = data.classification;
    this.notion = data.notion;
    this.impacts = data.impacts;
    this.synonyms = data.synonyms;
    this.projectId = data.projectId;
  }
}
