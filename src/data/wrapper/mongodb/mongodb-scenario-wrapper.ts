import { Scenario } from "../../../domain/entities/scenario";
import { Collection, Document, ObjectId, WithId } from "mongodb";
import { ScenarioDatabaseWrapper } from "../../interfaces/wrapper/scenario-database-wrapper";

export class MongoDBScenarioDatabaseWrapper implements ScenarioDatabaseWrapper {
  private scenario: Collection;

  constructor(scenario: Collection) {
    this.scenario = scenario;
  }

  async findById(id: string): Promise<Scenario> {
    const [result] = await this.scenario
      .find({ _id: new ObjectId(id) })
      .toArray();
    if (!result) {
      throw new Error("Scenario not found");
    }
    return {
      id: result._id.toString(),
      title: result.title,
      goal: result.goal,
      exceptions: result.exceptions,
      resources: result.resources,
      actors: result.actors,
      context: result.context,
      episodes: result.episodes,
      groups: result.groups,
      project: result.project,
    }
  }
  async findAll(): Promise<Scenario[]> {
    const result = await this.scenario.find({}).toArray();
    return result?.map((item: WithId<Document>) => ({
      id: item._id.toString(),
      title: item.title,
      goal: item.goal,
      exceptions: item.exceptions,
      resources: item.resources,
      actors: item.actors,
      context: item.context,
      episodes: item.episodes,
      groups: item.groups,
      project: item.project,
    }));
  }
  async insert(data: Scenario): Promise<undefined | Scenario> {
    const result = await this.scenario.insertOne({
      ...data,
      project: new ObjectId(data.project),
    });
    return await this.findById(result?.insertedId.toString());
  }
  async updateById(id: string, data: Scenario): Promise<undefined | Scenario> {
    const result = await this.scenario.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    if (result?.upsertedId) {
      return await this.findById(result?.upsertedId.toString());
    }
  }
  async deleteById(id: string): Promise<boolean> {
    const result = await this.scenario.deleteOne({ _id: new ObjectId(id) });
    return result?.deletedCount > 0;
  }
}
