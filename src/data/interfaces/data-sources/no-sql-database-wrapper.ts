export interface NoSQLDatabaseWrapper {
  find(query: object): Promise<any | any[]>;
  insert(doc: any): Promise<any>;
  update(id: string, doc: any): Promise<any>;
  delete(doc: any): Promise<any>;
}
