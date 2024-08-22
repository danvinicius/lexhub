import { Logger } from '@/utils/logger/logger';

export class AccessDeniedError extends Error {
  
  constructor() {
    super('Access denied');
    this.name = 'AccessDeniedError';
    Logger.error(this);
  }
}
