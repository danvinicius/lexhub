import { IsOptional, IsString } from "class-validator";
import { IContext } from "../../../core/domain/entities/scenario";

export class UpdateScenarioRequestDTO {
    @IsString()
    title: string;

    @IsString()
    goal: string;

    @IsOptional()
    context: IContext;

    constructor(data: any) {
        this.title = data.title;
        this.goal = data.goal;
        this.context = data.context;
    }
}