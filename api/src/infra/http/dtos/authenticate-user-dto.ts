import { z } from 'zod';

export const AuthenticateUserSchema = z.object({
  email: z.string().email('E-mail inválido').min(1, 'Email é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export type AuthenticateUserRequestDTO = z.infer<typeof AuthenticateUserSchema>;
