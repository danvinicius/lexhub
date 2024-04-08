import { IsArray, IsNumber } from "class-validator";

export class CreateManyScenariosRequestDTO {

    @IsArray()
    scenarios: {
        title: string;
        goal: string;
    }[]

    @IsNumber()
    projectId: number | string;

    constructor(data: any) {
        this.scenarios = data.scenarios;
        this.projectId = data.projectId;
    }
}