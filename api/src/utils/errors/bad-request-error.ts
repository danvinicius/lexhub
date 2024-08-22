import { Logger } from '@/utils/logger/logger';

export class BadRequestError extends Error {
  public statusCode: number;
  
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = 400;
    Logger.error(this);
  }
}
