import { Logger } from "@/util/logger/logger";

export class ServerError extends Error {
  private logger = Logger.getInstance();
  constructor(stack: string) {
    super("Internal server error");
    this.name = "ServerError";
    this.stack = stack;
    this.logger.error(this);
  }
}
