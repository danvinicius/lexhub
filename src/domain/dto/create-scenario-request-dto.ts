import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { IContext } from "../entities/scenario";

export class CreateScenarioRequestDTO {
    @IsString()
    title: string;

    @IsString()
    goal: string;

    @IsOptional()
    context: IContext;

    @IsNumber()
    projectId: number | string;

    constructor(data: any) {
        this.title = data.title;
        this.goal = data.goal;
        this.context = data.context;
        this.projectId = data.projectId;
    }
}