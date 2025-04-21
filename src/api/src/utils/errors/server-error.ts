import { Logger } from '@/utils/logger/logger';

export class ServerError extends Error {
  
  constructor(stack: string) {
    super('Erro interno');
    this.name = 'ServerError';
    this.stack = stack;
    Logger.error(this);
  }
}
