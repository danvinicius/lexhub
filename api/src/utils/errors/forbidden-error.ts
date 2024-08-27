import { Logger } from '@/utils/logger/logger';

export class ForbiddenError extends Error {
  
  constructor(message: string) {
    super(`Forbidden: ${message}`);
    this.name = 'ForbiddenError';
    Logger.error(this);
  }
}
