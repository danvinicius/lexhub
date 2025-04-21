import { BadRequestError } from "@/utils/errors";
import { ZodError, ZodSchema } from "zod";

export const validate = <T>(schema: ZodSchema<T>, data: unknown): T => {
  try {
    return schema.parse(data);
  } catch (error) {
    
    if (error instanceof ZodError) {
      throw new BadRequestError(
        error.errors.map((e) => e.message).join(', ')
      );
    }
    throw error;
  }
};