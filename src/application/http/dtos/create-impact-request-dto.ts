import { IsNumber, IsString } from "class-validator";

export class CreateImpactRequestDTO {
    @IsString()
    description: string;

    @IsNumber()
    symbolId: number | string;
    
    constructor(data: any) {
        this.description = data.description;
        this.symbolId = data.symbolId;
    }
}