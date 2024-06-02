import { Logger } from '@/util/logger/logger';

export class NotFoundError extends Error {
  
  public statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
    Logger.error(this);
  }
}
