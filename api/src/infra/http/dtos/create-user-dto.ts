import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido').min(1, 'Email é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export type CreateUserRequestDTO = z.infer<typeof CreateUserSchema>;
