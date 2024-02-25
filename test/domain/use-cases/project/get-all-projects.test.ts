import { Project } from "../../../../src/domain/entities/project";
import { ProjectRepository } from "../../../../src/domain/interfaces/repositories/project-repository";
import { GetAllProjects } from "../../../../src/domain/use-cases/project/get-all-projects";

describe("Get all projects Use Case", () => {
  class MockProjectRepository implements ProjectRepository {
    getProject(id: string): Promise<Project> {
      throw new Error("Method not implemented.");
    }
    getAllProjects(): Promise<Project[]> {
      throw new Error("Method not implemented.");
    }
    createProject(project: Project): Promise<number | string> {
      throw new Error("Method not implemented.");
    }
    updateProject(id: string, project: Project): Promise<void> {
      throw new Error("Method not implemented.");
    }
    deleteProject(id: string): Promise<void> {
      throw new Error("Method not implemented.");
    }
  }

  let mockProjectRepository: MockProjectRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockProjectRepository = new MockProjectRepository();
  });

  it("should return data", async () => {
    const expected: Project[] = [
      { id: "1", name: "Project alpha", description: "The alpha project" },
    ];

    jest.spyOn(mockProjectRepository, "getAllProjects").mockResolvedValue(expected);

    const getAllProjectsUseCase = new GetAllProjects(mockProjectRepository);
    const result = await getAllProjectsUseCase.execute();

    expect(mockProjectRepository.getAllProjects).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(expected);
  });
});
