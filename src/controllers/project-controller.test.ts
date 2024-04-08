import request from "supertest";
import { GetProject } from "@/domain/use-cases/project";
import { CreateProject } from "@/domain/use-cases/project";
import { DeleteProject } from "@/domain/use-cases/project";
import { GetAllProjects } from "@/domain/use-cases/project";
import { UpdateProject } from "@/domain/use-cases/project";
import { IProject } from "@/entities/project";
import { CreateProjectRequestDTO } from "@/infra/http/dtos";
import server from "@/config/server";
import ProjectController from "./project-controller";

class MockGetProject implements GetProject {
  execute(id: string | number): Promise<IProject | null> {
    throw new Error("Method not implemented.");
  }
}
class MockGetAllProjects implements GetAllProjects {
  execute(): Promise<IProject[]> {
    throw new Error("Method not implemented.");
  }
}
class MockCreateProject implements CreateProject {
  execute(project: CreateProjectRequestDTO): Promise<IProject> {
    throw new Error("Method not implemented.");
  }
}
class MockUpdateProject implements UpdateProject {
  execute({ id, project }: UpdateProject.Params): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
class MockDeleteProject implements DeleteProject {
  execute(id: string | number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

describe("Project controller", () => {
  let mockGetProject: MockGetProject;
  let mockGetAllProjects: MockGetAllProjects;
  let mockCreateProject: MockCreateProject;
  let mockUpdateProject: MockUpdateProject;
  let mockDeleteProject: MockDeleteProject;

  const route = "/project";

  beforeAll(() => {
    mockGetProject = new MockGetProject();
    mockGetAllProjects = new MockGetAllProjects();
    mockCreateProject = new MockCreateProject();
    mockUpdateProject = new MockUpdateProject();
    mockDeleteProject = new MockDeleteProject();

    server.use(
      route,
      ProjectController(
        mockGetProject,
        mockGetAllProjects,
        mockCreateProject,
        mockUpdateProject,
        mockDeleteProject
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
        users: []
      };
      jest
        .spyOn(mockGetProject, "execute")
        .mockImplementation(() => Promise.resolve(expected));

      const response = await request(server).get(`${route}/1`);
      expect(response.status).toBe(200);
      expect(mockGetProject.execute).toHaveBeenCalledTimes(1);
      expect(response.body).toStrictEqual(expected);
    });
  });
});
