import { UseCase } from "../base-use-case";

export interface AddOrRemoveEntity {
  [key: string]: number | string;
}

export interface AddActor extends UseCase<AddOrRemoveEntity, void> {}