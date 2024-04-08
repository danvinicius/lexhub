import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateEpisodeRequestDTO {
    @IsNumber()
    position: number;

    @IsString()
    description: string;

    @IsString()
    type: string;

    @IsNumber()
    @IsOptional()
    group: number | string;

    @IsNumber()
    scenarioId: number | string;

    constructor(data: any) {
        this.position = data.position;
        this.description = data.description;
        this.type = data.type;
        this.group = data.group;
        this.scenarioId = data.scenarioId;
    }
}