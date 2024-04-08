import { Logger } from '@/util/logger/logger';

export class EmailInUseError extends Error {
  private logger = Logger.getInstance();
  constructor() {
    super('The received email is already in use');
    this.name = 'EmailInUseError';
    this.logger.error(this);
  }
}
