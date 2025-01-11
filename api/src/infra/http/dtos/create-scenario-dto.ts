import { z } from 'zod';

export const ExceptionSchema = z.object({
  description: z.string().min(1, 'A descrição é obrigatória'),
});

export const ActorSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
});

export const RestrictionSchema = z.object({
  description: z.string().min(1, 'A descrição é obrigatória'),
});

export const ContextSchema = z.object({
  geographicLocation: z.string().optional(),
  temporalLocation: z.string().optional(),
  preCondition: z.string().optional(),
  restrictions: z.array(RestrictionSchema).optional(),
});


export const CreateScenarioSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  goal: z.string().min(1, 'O objetivo é obrigatório'),
  context: ContextSchema.optional(),
  actors: z.array(ActorSchema).optional(),
  exceptions: z.array(ExceptionSchema).optional(),
  projectId: z.string().min(1, 'O ID do projeto é obrigatório'),
});

export type CreateScenarioRequestDTO = z.infer<typeof CreateScenarioSchema>;
