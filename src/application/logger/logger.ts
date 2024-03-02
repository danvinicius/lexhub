export interface ILogger {
    error(text: unknown): void
    info(text: string): void
    warn(text: string): void
    debug(text: string): void
}