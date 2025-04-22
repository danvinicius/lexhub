import { z } from 'zod';

export const UpdateUserSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  newPassword: z.string().optional(),
});

export type UpdateUserRequestDTO = z.infer<typeof UpdateUserSchema>;
