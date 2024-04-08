import { Logger } from "@/util/logger/logger";

export class MissingParamError extends Error {
  private logger = Logger.getInstance();
  constructor(paramName: string) {
    super(`Missing param: ${paramName}`);
    this.name = "MissingParamError";
    this.logger.error(this);
  }
}
