import { BadRequestError} from '@/utils/errors';
import { validate as validateClass } from 'class-validator';

export const validate = async (data: any) => {
  const errors: any = await validateClass(data);
  if (errors.length) {
    const error = Object.values(errors[0].constraints)[0] as string;
    throw new BadRequestError(error);
  }
};
