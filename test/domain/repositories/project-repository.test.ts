import { Project } from "../../../src/domain/entities/project";
import { ProjectDatabaseWrapper } from "../../../src/data/interfaces/wrapper/project-database-wrapper";
import { ProjectRepositoryImpl } from "../../../src/domain/repositories/project-repository";

class MockProjectDatabaseWrapper implements ProjectDatabaseWrapper {
  findById(id: string | number): Promise<Project | null> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Project[]> {
    throw new Error("Method not implemented.");
  }
  insert(data: any): Promise<string | number> {
    throw new Error("Method not implemented.");
  }
  updateById(id: string | number, data: Project): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string | number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

}

describe("Project repository", () => {
  let mockProjectDatabaseWrapper: MockProjectDatabaseWrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    mockProjectDatabaseWrapper = new MockProjectDatabaseWrapper();
  });

  describe("Get all projects", () => {
    it("should return data", async () => {
      const expected: Project[] = [
        { id: "1", name: "Project alpha", description: "The alpha project" },
      ];
      jest.spyOn(mockProjectDatabaseWrapper, 'findAll').mockImplementation(() => Promise.resolve(expected));
      const projectRepository = new ProjectRepositoryImpl(mockProjectDatabaseWrapper);
      const result = await projectRepository.getAllProjects();
      expect(result).toBe(expected);
    });
  });
});
