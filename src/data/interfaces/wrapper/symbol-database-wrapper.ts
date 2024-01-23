import { Symbol } from "../../../domain/entities/symbol";

export interface SymbolDatabaseWrapper {
  findById(id: string | number): Promise<null | Symbol>;
  findAll(): Promise<Symbol[]>;
  insert(data: any): Promise<string | number>;
  updateById(id: string | number, data: Symbol): Promise<boolean>;
  deleteById(id: string | number): Promise<boolean>;
}
