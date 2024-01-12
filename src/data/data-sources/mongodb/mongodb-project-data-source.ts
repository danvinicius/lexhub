import { Project } from "../../../domain/entities/project";
import { ProjectDataSource } from "../../interfaces/data-sources/project-data-source";
import { NoSQLDatabaseWrapper } from "../../interfaces/data-sources/no-sql-database-wrapper";
import { Document, WithId } from "mongodb";

export class MongoDBProjectDataSource implements ProjectDataSource {
  private db: NoSQLDatabaseWrapper;

  constructor(db: NoSQLDatabaseWrapper) {
    this.db = db;
  }
  async get(id: string): Promise<Project> {
    const [project] = await this.db.find({ _id: id });
    return project.map((item: WithId<Document>) => ({
      id: item._id.toString(),
      name: item.name,
    }));
  }
  async getAll(): Promise<Project[]> {
    const result = await this.db.find({});
    return result.map((item: WithId<Document>) => ({
      id: item._id.toString(),
      name: item.name,
    }));
  }
  async create(project: Project): Promise<void> {
    await this.db.insert(project);
  }
  async update(id: string, project: Project): Promise<void> {
    await this.db.update(id, project);
  }
  async delete(id: string): Promise<void> {
    await this.db.delete(id);
  }
}
