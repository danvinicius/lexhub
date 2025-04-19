import { z } from 'zod';

export const VerifyRecoveryCodeSchema = z.object({
  recoveryCode: z.string().min(1, 'Código de recuperação é obrigatório'),
  email: z.string().email('E-mail inválido').min(1, 'Email é obrigatório'),
});

export type VerifyRecoveryCodeRequestDTO = z.infer<
  typeof VerifyRecoveryCodeSchema
>;
