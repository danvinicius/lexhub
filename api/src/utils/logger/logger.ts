import jetLoger from 'jet-logger';

export class Logger {
  static error(error: Error): void {
    jetLoger.err(error.stack);
  }
  static info(text: string): void {
    jetLoger.info(text);
  }
  static warn(text: string): void {
    jetLoger.warn(text);
  }
  static debug(text: string): void {
    throw new Error('Method not implemented.');
  }
}
