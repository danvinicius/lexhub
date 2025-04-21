import { Logger } from '@/utils/logger/logger';

export class UnauthorizedError extends Error {
  
  constructor(message: string) {
    super(`${message}`);
    this.name = 'UnauthorizedError';
    Logger.error(this);
  }
}
