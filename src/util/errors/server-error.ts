import { Logger } from '@/util/logger/logger';

export class ServerError extends Error {
  
  constructor(stack: string) {
    super('Internal server error');
    this.name = 'ServerError';
    this.stack = stack;
    Logger.error(this.stack);
  }
}
