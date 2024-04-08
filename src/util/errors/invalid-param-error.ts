import { Logger } from '@/util/logger/logger';

export class InvalidParamError extends Error {
  private logger = Logger.getInstance();
  constructor(paramName: string) {
    super(`Invalid param: ${paramName}`);
    this.name = 'InvalidParamError';
    this.logger.error(this);
  }
}
