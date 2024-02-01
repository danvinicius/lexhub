import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { IImpact, ISynonym } from "../entities/symbol";

export class SymbolRequestDTO {
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
    @IsOptional()
    synonyms: ISynonym[];

    @IsArray()
    @IsOptional()
    impacts: IImpact[];

    @IsNumber()
    projectId: number | string;

    constructor(data: any) {
        this.name = data.name;
        this.classification = data.classification;
        this.notion = data.notion;
        this.synonyms = data.synonyms;
        this.impacts = data.impacts;
        this.projectId = data.projectId;
    }
}