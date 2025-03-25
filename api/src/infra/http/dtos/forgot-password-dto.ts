import { z } from 'zod';

export const ForgotPasswordSchema = z.object({
  email: z.string().email('E-mail inválido').min(1, 'Email é obrigatório'),
});

export type ForgotPassworRequestDTO = z.infer<typeof ForgotPasswordSchema>;
