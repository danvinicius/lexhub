import { Logger } from '@/util/logger/logger';

export class AccessDeniedError extends Error {
  private logger = Logger.getInstance();
  constructor() {
    super('Access denied');
    this.name = 'AccessDeniedError';
    this.logger.error(this);
  }
}
