import { z } from 'zod';

export const ResetPasswordSchema = z.object({
  password: z.string().min(1, 'Senha é obrigatória'),
  token: z.string().min(1, 'Token é obrigatório'),
});

export type ResetPasswordRequestDTO = z.infer<typeof ResetPasswordSchema>;
