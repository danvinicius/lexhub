import { z } from "zod";

const ScenarioSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  goal: z.string().min(1, 'O objetivo é obrigatório'),
});

export const CreateManyScenariosSchema = z.object({
  scenarios: z.array(ScenarioSchema).min(1, 'É necessário informar pelo menos um cenário'),
  projectId: z.string().min(1, 'O ID do projeto é obrigatório'),
});

export type CreateManyScenariosRequestDTO = z.infer<typeof CreateManyScenariosSchema>;
