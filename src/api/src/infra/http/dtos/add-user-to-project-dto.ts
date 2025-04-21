import { z } from 'zod';
import { IUserRole } from '@/models';

export const AddUserToProjectSchema = z.object({
  email: z.string().email('E-mail inválido').min(1, 'Email é obrigatório'),
  role: z
    .string()
    .optional()
    .superRefine((value, ctx) => {
      if (!value) {
        ctx.addIssue({
          code: 'custom',
          message: 'Função é obrigatória',
        });
      } else if (!Object.values(IUserRole).includes(value as IUserRole)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Função inválida',
        });
      }
    }),
  projectId: z.string().min(1, 'Projeto é obrigatório'),
});

export type AddUserToProjectRequestDTO = z.infer<typeof AddUserToProjectSchema>;
