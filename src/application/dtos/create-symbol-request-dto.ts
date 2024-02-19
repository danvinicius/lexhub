import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { IImpact, ISynonym } from "../entities/symbol";

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
    projectId: number | string;

    constructor(data: any) {
        this.name = data.name;
        this.classification = data.classification;
        this.notion = data.notion;
        this.projectId = data.projectId;
    }
}