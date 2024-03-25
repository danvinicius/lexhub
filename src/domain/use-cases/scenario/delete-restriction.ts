import { UseCase } from "../base-use-case";

export interface DeleteRestriction
  extends UseCase<number | string, void> {}