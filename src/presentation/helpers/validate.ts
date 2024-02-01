import { BadRequestError } from "../errors/bad-request-error";
import { validate as validateClass } from "class-validator";

export const validate = async (data: any) => {
    const errors: any = await validateClass(data);
    if (errors.length) {
        throw new BadRequestError(
            Object.values(errors[0].constraints)[0] as string
        );
    }
}