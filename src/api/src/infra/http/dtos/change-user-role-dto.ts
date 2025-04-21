import { IUserRole } from '@/models';
import { z } from 'zod';

export const ChangeUserRoleSchema = z.object({
  userId: z.string().min(1, "Usuário é obrigatório"),
  newRole: z.string().refine((value) => Object.values(IUserRole).includes(value as IUserRole), {
    message: 'Função inválida',
  }),
  projectId: z.string().min(1, "Projeto é obrigatório"),
});

export type ChangeUserRoleRequestDTO = z.infer<typeof ChangeUserRoleSchema>;
