import "reflect-metadata";
import {
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SynonymDTO, ImpactDTO } from "./create-symbol-request-dto";

export class UpdateSymbolRequestDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  classification: string;

  @IsString()
  notion: string;

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => SynonymDTO)
  synonyms: SynonymDTO[];
  
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => ImpactDTO)
  impacts: ImpactDTO[];

  @IsString()
  projectId: string;

  // todo: synonyms and impacts validation not working

  constructor(data: any) {
    this.name = data.name;
    this.classification = data.classification;
    this.notion = data.notion;
    this.synonyms = data.synonyms;
    this.impacts = data.impacts;
    this.projectId = data.projectId;
  }
}