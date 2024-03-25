import { UseCase } from "../base-use-case";
import { AddOrRemoveEntity } from "./add-actor";

export interface RemoveActor extends UseCase<AddOrRemoveEntity, void> {}