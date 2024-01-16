import { Collection, ObjectId } from "mongodb";
import { ProjectDatabaseWrapper } from "../../../../src/data/interfaces/wrapper/project-database-wrapper";
import { MongoDBProjectDatabaseWrapper } from "../../../../src/data/wrapper/mongodb/mongodb-project-database-wrapper";

describe("MongoDB project data source", () => {
  
  interface MockMongoDBProjectCollection {
    find(): any,
    insertOne(): any,
    updateOne(): any,
    deleteOne(): any,
  }

  let mockMongoDBProjectCollection: Collection | MockMongoDBProjectCollection;

  beforeAll(async () => {
    mockMongoDBProjectCollection = {
      find: jest.fn(),
      insertOne: jest.fn(),
      updateOne: jest.fn(),
      deleteOne: jest.fn(),
    } as MockMongoDBProjectCollection;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get insert a project', async () => {
    const databaseWrapper = new MongoDBProjectDatabaseWrapper(mockMongoDBProjectCollection as Collection);
    const project = {name: "Project alpha", description: "The alpha project" }
    const expectedId = '65a67e5410596066624a9b94'
    jest.spyOn(mockMongoDBProjectCollection, 'insertOne').mockImplementation(() => Promise.resolve({insertedId: new ObjectId(expectedId)}));
    const result = await databaseWrapper.insert(project);
    expect(mockMongoDBProjectCollection.insertOne).toHaveBeenCalledWith(project)
    expect(result).toBe(expectedId)
  })
});
