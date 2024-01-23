import { Scenario } from "../../../domain/entities/scenario";

export interface ScenarioDatabaseWrapper {
  findById(id: string | number): Promise<null | Scenario>;
  findAll(): Promise<Scenario[]>;
  insert(data: any): Promise<string | number>;
  updateById(id: string | number, data: Scenario): Promise<boolean>;
  deleteById(id: string | number): Promise<boolean>;
}
