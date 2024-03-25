import { UseCase } from "../base-use-case";

export interface DeleteException
  extends UseCase<number | string, void> {}