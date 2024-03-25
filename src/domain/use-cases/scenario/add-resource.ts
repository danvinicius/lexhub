import { UseCase } from "../base-use-case";
import { AddOrRemoveEntity } from "./add-actor";

export interface AddResource extends UseCase<AddOrRemoveEntity, void> {}