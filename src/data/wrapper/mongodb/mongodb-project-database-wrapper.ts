import { Project } from "../../../domain/entities/project";
import { Collection, Document, ObjectId, WithId } from "mongodb";
import { ProjectDatabaseWrapper } from "../../interfaces/wrapper/project-database-wrapper";

export class MongoDBProjectDatabaseWrapper implements ProjectDatabaseWrapper {
  private project: Collection;

  constructor(project: Collection) {
    this.project = project;
  }

  async findById(id: string): Promise<null | Project> {
    const [result] = await this.project
      .find({ _id: new ObjectId(id) })
      .toArray();
    if (result) {
      return {
        id: result._id.toString(),
        name: result.name,
        description: result.description,
      };
    }
    return null;
  }
  async findAll(): Promise<Project[]> {
    const result = await this.project.find({}).toArray();
    return result?.map((item: WithId<Document>) => ({
      id: item._id.toString(),
      name: item.name,
      description: item.description,
    }));
  }
  async insert(data: Project): Promise<string> {
    const result = await this.project.insertOne(data);
    return result?.insertedId.toString();
  }
  async updateById(id: string, data: Project): Promise<boolean> {
    const result = await this.project.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    return result?.modifiedCount > 0;
  }
  async deleteById(id: string): Promise<boolean> {
    const result = await this.project.deleteOne({ _id: new ObjectId(id) });
    return result?.deletedCount > 0;
  }
}
