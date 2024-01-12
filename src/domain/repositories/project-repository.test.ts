import { Project } from "../entities/project";
import { ProjectDataSource } from "../../data/interfaces/data-sources/project-data-source";
import { ProjectRepositoryImpl } from "./project-repository";

class MockProjectDataSource implements ProjectDataSource {
  get(id: string): Promise<Project> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<Project[]> {
    throw new Error("Method not implemented.");
  }
  create(project: Project): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(id: string, project: Project): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

describe("Project repository", () => {
  let mockProjectDataSource: MockProjectDataSource;

  beforeEach(() => {
    jest.clearAllMocks();
    mockProjectDataSource = new MockProjectDataSource();
  });

  describe("Get all projects", () => {
    it("should return data", async () => {
      const expected: Project[] = [
        { id: "1", name: "Project alpha", description: "The alpha project" },
      ];
      jest.spyOn(mockProjectDataSource, 'getAll').mockImplementation(() => Promise.resolve(expected));
      const projectRepository = new ProjectRepositoryImpl(mockProjectDataSource);
      const result = await projectRepository.getAllProjects();
      expect(result).toBe(expected);
    });
  });
});
