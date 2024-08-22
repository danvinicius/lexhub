import { Logger } from '@/utils/logger/logger';

export class MissingParamError extends Error {
  
  constructor(paramName: string) {
    super(`Missing param: ${paramName}`);
    this.name = 'MissingParamError';
    Logger.error(this);
  }
}
