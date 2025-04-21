/**
 * Gera um código alfanumérico de 6 dígitos para recuperação de senha
 * @returns Uma string com 6 caracteres alfanuméricos (letras maiúsculas e números)
 */
export function generatePasswordRecoveryCode(): string {
  const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const codeLength = 6;

  let code = '';

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    code += allowedChars[randomIndex];
  }

  return code;
}