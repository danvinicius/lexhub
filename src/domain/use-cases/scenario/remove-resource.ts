import { UseCase } from "../base-use-case";
import { AddOrRemoveEntity } from "./add-actor";

export interface RemoveResource
  extends UseCase<AddOrRemoveEntity, void> {}