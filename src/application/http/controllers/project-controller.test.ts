import request from "supertest";
import { GetProjectUseCase } from "../../../core/domain/use-cases/project/interfaces/get-project";
import { CreateProjectUseCase } from "../../../core/domain/use-cases/project/interfaces/create-project";
import { DeleteProjectUseCase } from "../../../core/domain/use-cases/project/interfaces/delete-project";
import { GetAllProjectsUseCase } from "../../../core/domain/use-cases/project/interfaces/get-all-projects";
import { UpdateProjectUseCase } from "../../../core/domain/use-cases/project/interfaces/update-project";
import { IProject } from "../../../core/domain/entities/project";
import { CreateProjectRequestDTO } from "../dtos/create-project-request-dto";
import { UpdateProjectRequestDTO } from "../dtos/update-project-request-dto";
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
  execute(
    id: string | number,
    project: UpdateProjectRequestDTO
  ): Promise<void> {
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

  const route = '/project'

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

  describe('/GET/:id project', () => {
    it('should return return project with given id', async () => {
        const expected: IProject = { id: 1, name: "Project alpha", description: "The alpha project", symbols: [], scenarios: []}
        jest.spyOn(mockGetProjectUseCase, 'execute').mockImplementation(() => Promise.resolve(expected));

        const response = await request(server).get(`${route}/1`);
        expect(response.status).toBe(200);
        expect(mockGetProjectUseCase.execute).toHaveBeenCalledTimes(1)
        expect(response.body).toStrictEqual(expected);
    }) 
  })
});
