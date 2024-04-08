import { Logger } from '@/util/logger/logger';

export class NotFoundError extends Error {
  private logger = Logger.getInstance();
  public statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
    this.logger.error(this);
  }
}
