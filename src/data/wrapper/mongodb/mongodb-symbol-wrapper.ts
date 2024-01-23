import { Symbol } from "../../../domain/entities/symbol";
import { Collection, Document, ObjectId, WithId } from "mongodb";
import { SymbolDatabaseWrapper } from "../../interfaces/wrapper/symbol-database-wrapper";

export class MongoDBSymbolDatabaseWrapper implements SymbolDatabaseWrapper {
  private symbol: Collection;

  constructor(symbol: Collection) {
    this.symbol = symbol;
  }

  async findById(id: string): Promise<null | Symbol> {
    const [result] = await this.symbol
      .find({ _id: new ObjectId(id) })
      .toArray();
    if (result) {
      return {
        id: result._id.toString(),
        name: result.name,
        classification: result.classification,
        notion: result.notion,
        synonyms: result.synonyms,
        impacts: result.impact,
      };
    }
    return null;
  }
  async findAll(): Promise<Symbol[]> {
    const result = await this.symbol.find({}).toArray();
    return result?.map((item: WithId<Document>) => ({
      id: item._id.toString(),
      name: item.name,
      classification: item.classification,
      notion: item.notion,
      synonyms: item.synonyms,
      impacts: item.impact,
    }));
  }
  async insert(data: Symbol): Promise<string> {
    const result = await this.symbol.insertOne(data);
    return result?.insertedId.toString();
  }
  async updateById(id: string, data: Symbol): Promise<boolean> {
    const result = await this.symbol.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    return result?.modifiedCount > 0;
  }
  async deleteById(id: string): Promise<boolean> {
    const result = await this.symbol.deleteOne({ _id: new ObjectId(id) });
    return result?.deletedCount > 0;
  }
}
