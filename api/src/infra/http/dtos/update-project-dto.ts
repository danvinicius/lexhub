import { z } from 'zod';

export const UpdateProjectSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),
  private: z.boolean(),
});

export type UpdateProjectRequestDTO = z.infer<typeof UpdateProjectSchema>;
