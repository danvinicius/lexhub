import { NoSQLDatabaseWrapper } from "../../../../src/data/interfaces/data-sources/no-sql-database-wrapper";
import { MongoDBProjectDataSource } from "../../../../src/data/data-sources/mongodb/mongodb-project-data-source";

describe("MongoDB project data source", () => {
  let mockNoSQLDatabaseWrapper: NoSQLDatabaseWrapper;

  beforeAll(async () => {
    mockNoSQLDatabaseWrapper = {
      find: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get insert a project', async () => {
    const ds = new MongoDBProjectDataSource(mockNoSQLDatabaseWrapper);
    jest.spyOn(mockNoSQLDatabaseWrapper, 'insert').mockImplementation(() => Promise.resolve({_id: "123"}));
    await ds.create({name: "Project alpha", description: "The alpha project" });
    expect(mockNoSQLDatabaseWrapper.insert).toHaveBeenCalledWith({name: "Project alpha", description: "The alpha project" })
  })
});
