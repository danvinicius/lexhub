import { ILogger } from "../application/logger/logger";
import jetLoger from "jet-logger";

export class Logger implements ILogger {
    private static _instance: Logger;

    constructor() { }

    public static getInstance() {
        if (!Logger._instance) {
            Logger._instance = new Logger()
        }
        return Logger._instance;
    }
    error(text: string): void {
        jetLoger.err(text);
    }
    info(text: string): void {
        jetLoger.info(text);
    }
    warn(text: string): void {
        jetLoger.warn(text);
    }
    debug(text: string): void {
        throw new Error("Method not implemented.");
    }
}