import jetLoger from 'jet-logger';

export class Logger {
  private static _instance: Logger;

  constructor() {}

  public static getInstance() {
    if (!Logger._instance) {
      Logger._instance = new Logger();
    }
    return Logger._instance;
  }
  error(error: Error): void {
    jetLoger.err(error);
  }
  info(text: string): void {
    jetLoger.info(text);
  }
  warn(text: string): void {
    jetLoger.warn(text);
  }
  debug(text: string): void {
    throw new Error('Method not implemented.');
  }
}
