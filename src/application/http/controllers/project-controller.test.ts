import request from "supertest";
import {
  GetProjectUseCase,
  UpdateProjectUseCaseParams,
} from "../../../core/domain/use-cases/project/interfaces";
import { CreateProjectUseCase } from "../../../core/domain/use-cases/project/interfaces";
import { DeleteProjectUseCase } from "../../../core/domain/use-cases/project/interfaces";
import { GetAllProjectsUseCase } from "../../../core/domain/use-cases/project/interfaces";
import { UpdateProjectUseCase } from "../../../core/domain/use-cases/project/interfaces";
import { IProject } from "../../../core/domain/entities/project";
import { CreateProjectRequestDTO } from "../dtos/create-project-request-dto";
import server from "../../../config/server";
import ProjectController from "./project-controller";

class MockGetProjectUseCase implements GetProjectUseCase {
  execute(id: string | number): Promise<IProject | null> {
    throw new Error("Method not implemented.");
  }
}
class MockGetAllProjectsUseCase implements GetAllProjectsUseCase {
  execute(): Promise<IProject[]> {
    throw new Error("Method not implemented.");
  }
}
class MockCreateProjectUseCase implements CreateProjectUseCase {
  execute(project: CreateProjectRequestDTO): Promise<IProject> {
    throw new Error("Method not implemented.");
  }
}
class MockUpdateProjectUseCase implements UpdateProjectUseCase {
  execute({ id, project }: UpdateProjectUseCaseParams): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
class MockDeleteProjectUseCase implements DeleteProjectUseCase {
  execute(id: string | number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

describe("Project controller", () => {
  let mockGetProjectUseCase: MockGetProjectUseCase;
  let mockGetAllProjectsUseCase: MockGetAllProjectsUseCase;
  let mockCreateProjectUseCase: MockCreateProjectUseCase;
  let mockUpdateProjectUseCase: MockUpdateProjectUseCase;
  let mockDeleteProjectUseCase: MockDeleteProjectUseCase;

  const route = "/project";

  beforeAll(() => {
    mockGetProjectUseCase = new MockGetProjectUseCase();
    mockGetAllProjectsUseCase = new MockGetAllProjectsUseCase();
    mockCreateProjectUseCase = new MockCreateProjectUseCase();
    mockUpdateProjectUseCase = new MockUpdateProjectUseCase();
    mockDeleteProjectUseCase = new MockDeleteProjectUseCase();

    server.use(
      route,
      ProjectController(
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

  describe("/GET/:id project", () => {
    it("should return return project with given id", async () => {
      const expected: IProject = {
        id: 1,
        name: "Project alpha",
        description: "The alpha project",
        symbols: [],
        scenarios: [],
      };
      jest
        .spyOn(mockGetProjectUseCase, "execute")
        .mockImplementation(() => Promise.resolve(expected));

      const response = await request(server).get(`${route}/1`);
      expect(response.status).toBe(200);
      expect(mockGetProjectUseCase.execute).toHaveBeenCalledTimes(1);
      expect(response.body).toStrictEqual(expected);
    });
  });
});
