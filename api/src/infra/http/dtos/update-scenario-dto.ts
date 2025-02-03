import { z } from 'zod';
import {
  ContextSchema,
  RestrictionSchema,
} from './create-scenario-dto';

export const ExceptionSchema = z.object({
  description: z.string().min(1, 'A descrição é obrigatória'),
});

export const ActorSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
});

const NonSequentialEpisodeSchema = z.object({
  id: z.string().optional(),
  type: z.string().min(1, 'O tipo do episódio não sequencial é obrigatório'),
  description: z
    .string()
    .min(1, 'A descrição do episódio não sequencial é obrigatória'),
  restriction: z.string().optional(),
});

export const EpisodeSchema = z.object({
  id: z.string().optional(),
  position: z
    .number({ invalid_type_error: 'A posição deve ser um número' })
    .int('A posição deve ser um número inteiro')
    .min(1, 'A posição deve ser maior ou igual a 1'),
  description: z.string().optional(),
  type: z.string().optional(),
  restriction: z.string().optional(),
  nonSequentialEpisodes: z.array(NonSequentialEpisodeSchema).optional(),
});

export const ResourceSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'O nome do recurso é obrigatório'),
  restrictions: z.array(RestrictionSchema).optional(),
});

export const UpdateScenarioSchema = z.object({
  title: z.string().min(1, 'O título não pode ser vazio').optional(),
  goal: z.string().min(1, 'O objetivo não pode ser vazio').optional(),
  context: ContextSchema.optional(),
  actors: z.array(ActorSchema).optional(),
  exceptions: z.array(ExceptionSchema).optional(),
  episodes: z.array(EpisodeSchema).optional(),
  resources: z.array(ResourceSchema).optional(),
  projectId: z.string().min(1, 'O ID do projeto é obrigatório'),
});

export type UpdateScenarioRequestDTO = z.infer<typeof UpdateScenarioSchema>;
