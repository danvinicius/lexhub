import { Logger } from '@/utils/logger/logger';

export class ForbiddenError extends Error {
  
  constructor(public message: string) {
    super(`${message}`);
    this.name = 'ForbiddenError';
    Logger.error(this);
  }
}
