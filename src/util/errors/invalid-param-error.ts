import { Logger } from '@/util/logger/logger';

export class InvalidParamError extends Error {
  
  constructor(paramName: string) {
    super(`Invalid param: ${paramName}`);
    this.name = 'InvalidParamError';
    Logger.error(this);
  }
}
