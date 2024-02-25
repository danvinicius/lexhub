import { IsNumber, IsString } from "class-validator";

export class AddExceptionRequestDTO {
    @IsString()
    description: string;

    @IsNumber()
    scenarioId: number | string;

    constructor(data: any) {
        this.description = data.description;
        this.scenarioId = data.scenarioId;
    }
}