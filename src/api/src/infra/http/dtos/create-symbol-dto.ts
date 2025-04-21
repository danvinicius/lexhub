import { z } from 'zod';

export const SynonymSchema = z.object({
  name: z.string().min(1, "O nome do sinônimo é obrigatório."),
});

export const ImpactSchema = z.object({
  description: z.string().min(1, "A descrição do impacto é obrigatória."),
});

export const CreateSymbolSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  notion: z.string().min(1, "A noção é obrigatória."),
  classification: z.string().min(1, "A classificação é obrigatória."),
  synonyms: z.array(SynonymSchema),
  impacts: z.array(ImpactSchema),
  projectId: z.string().min(1, "O ID do projeto é obrigatório."),
});

export type CreateSymbolRequestDTO = z.infer<typeof CreateSymbolSchema>;