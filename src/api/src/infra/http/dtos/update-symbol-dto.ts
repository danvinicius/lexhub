import { z } from 'zod';
import { ImpactSchema, SynonymSchema } from './create-symbol-dto';

export const UpdateSymbolSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  notion: z.string().min(1, "A noção é obrigatória."),
  classification: z.string().min(1, "A classificação é obrigatória."),
  synonyms: z.array(SynonymSchema),
  impacts: z.array(ImpactSchema),
  projectId: z.string().min(1, "O ID do projeto é obrigatório."),
});


export type UpdateSymbolRequestDTO = z.infer<typeof UpdateSymbolSchema>;