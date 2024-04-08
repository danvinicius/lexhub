import { Logger } from '@/util/logger/logger';

export class BadRequestError extends Error {
  public statusCode: number;
  private logger = Logger.getInstance();
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = 400;
    this.logger.error(this);
  }
}
