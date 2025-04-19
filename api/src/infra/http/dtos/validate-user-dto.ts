import { z } from 'zod';

export const ValidateUserSchema = z.object({
  verifyToken: z.string().min(1, 'Token é obrigatório'),
});

export type ValidateUserRequestDTO = z.infer<typeof ValidateUserSchema>;
