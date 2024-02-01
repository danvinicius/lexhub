import request from "supertest";
import { describe } from "node:test";
import { Project } from "../../src/domain/entities/project";
import { CreateProjectUseCase } from "../../src/domain/interfaces/use-cases/project/create-project";
import { GetProjectUseCase } from "../../src/domain/interfaces/use-cases/project/get-project";
import server from "../../src/server";
import ProjectRouter from "../../src/presentation/routers/project-router";
import { GetAllProjectsUseCase } from "../../src/domain/interfaces/use-cases/project/get-all-projects";
import { UpdateProjectUseCase } from "../../src/domain/interfaces/use-cases/project/update-project";
import { DeleteProjectUseCase } from "../../src/domain/interfaces/use-cases/project/delete-project";

class MockGetProjectUseCase implements GetProjectUseCase {
  execute(id: string): Promise<Project> {
    throw new Error("Method not implemented.");
  }
}

class MockGetAllProjectsUseCase implements GetAllProjectsUseCase {
  execute(): Promise<Project[]> {
    throw new Error("Method not implemented.");
  }
}
class MockCreateProjectUseCase implements CreateProjectUseCase {
  execute(project: Project): Promise<string | number> {
    throw new Error("Method not implemented.");
  }
}
class MockUpdateProjectUseCase implements UpdateProjectUseCase {
  execute(id: string, project: Project): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

class MockDeleteProjectUseCase implements DeleteProjectUseCase {
  execute(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

describe("Project router", () => {
  let mockGetProjectUseCase: MockGetProjectUseCase;
  let mockCreateProjectUseCase: MockCreateProjectUseCase;
  let mockGetAllProjectsUseCase: MockGetAllProjectsUseCase;
  let mockUpdateProjectUseCase: MockUpdateProjectUseCase;
  let mockDeleteProjectUseCase: MockDeleteProjectUseCase;

  beforeAll(() => {
    mockGetProjectUseCase = new MockGetProjectUseCase();
    mockGetAllProjectsUseCase = new MockGetAllProjectsUseCase();
    mockCreateProjectUseCase = new MockCreateProjectUseCase();
    mockUpdateProjectUseCase = new MockUpdateProjectUseCase();
    mockDeleteProjectUseCase = new MockDeleteProjectUseCase();
    server.use(
      "/project",
      ProjectRouter(
        mockGetProjectUseCase,
        mockGetAllProjectsUseCase,
        mockCreateProjectUseCase,
        mockUpdateProjectUseCase,
        mockDeleteProjectUseCase
      )
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("/GET project", () => {
    it("should return 200 with data", async () => {
      const expected: Project[] = [{ id: "1", name: "Project alpha", description: "The alpha project" }]

      jest.spyOn(mockGetAllProjectsUseCase, "execute").mockImplementation(() => Promise.resolve(expected));

      const response = await request(server).get('/project');
      expect(response.status).toBe(200);
      expect(mockGetAllProjectsUseCase.execute).toHaveBeenCalledTimes(1);
      expect(response.body).toStrictEqual(expected);
    });
  });
});
