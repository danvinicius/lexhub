import { Logger } from '@/util/logger/logger';

export class UnauthorizedError extends Error {
  private logger = Logger.getInstance();
  constructor(message: string) {
    super(`Unauthorized: ${message}`);
    this.name = 'UnauthorizedError';
    this.logger.error(this);
  }
}
