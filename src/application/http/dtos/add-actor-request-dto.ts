import { IsNumber, IsString } from "class-validator";

export class AddActorRequestDTO {
    @IsNumber()
    scenarioId: number | string;

    constructor(data: any) {
        this.scenarioId = data.scenarioId;
    }
}