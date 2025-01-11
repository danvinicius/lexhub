import { z } from 'zod';

export const RemoveUserFromProjectSchema = z.object({
  userId: z.string().min(1, 'Usuário é obrigatório'),
  projectId: z.string().min(1, 'Projeto é obrigatório'),
});

export type RemoveUserFromProjectRequestDTO = z.infer<typeof RemoveUserFromProjectSchema>;
