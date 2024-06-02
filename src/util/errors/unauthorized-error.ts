import { Logger } from '@/util/logger/logger';

export class UnauthorizedError extends Error {
  
  constructor(message: string) {
    super(`Unauthorized: ${message}`);
    this.name = 'UnauthorizedError';
    Logger.error(this);
  }
}
