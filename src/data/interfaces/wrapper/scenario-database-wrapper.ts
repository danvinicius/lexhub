import { Scenario } from "../../../domain/entities/scenario";

export interface ScenarioDatabaseWrapper {
  findById(id: string | number): Promise<Scenario>;
  findAll(): Promise<Scenario[]>;
  insert(data: any): Promise<undefined | Scenario>;
  updateById(id: string | number, data: Scenario): Promise<undefined | Scenario>;
  deleteById(id: string | number): Promise<boolean>;
}
