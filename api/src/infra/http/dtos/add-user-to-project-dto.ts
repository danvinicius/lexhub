import { z } from 'zod';
import { IUserRole } from '@/models';

export const AddUserToProjectSchema = z.object({
  email: z.string().email('E-mail inválido').min(1, 'Email é obrigatório'),
  role: z.string().refine((value) => Object.values(IUserRole).includes(value as IUserRole), {
    message: 'Função inválida',
  }),
  projectId: z.string().min(1, 'Projeto é obrigatório'),
});

export type AddUserToProjectRequestDTO = z.infer<typeof AddUserToProjectSchema>;
