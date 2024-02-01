import { CreateProjectUseCase } from "../../interfaces/use-cases/project/create-project";
import { GetAllProjectsUseCase } from "../../interfaces/use-cases/project/get-all-projects";
import { GetProjectUseCase } from "../../interfaces/use-cases/project/get-project";
import { UpdateProjectUseCase } from "../../interfaces/use-cases/project/update-project";
import { DeleteProjectUseCase } from "../../interfaces/use-cases/project/delete-project";
import express, { Response, Request, NextFunction } from "express";
import { NotFoundError } from "../errors/not-found-error";
import { BadRequestError } from "../errors/bad-request-error";
import { ProjectRequestDTO } from "../../domain/dto/project-request-dto";
const { validate } = require("class-validator");

export default function ProjectRouter(
  getProjectUseCase: GetProjectUseCase,
  getAllProjectsUseCase: GetAllProjectsUseCase,
  createProjectUseCase: CreateProjectUseCase,
  updateProjectUseCase: UpdateProjectUseCase,
  deleteProjectUseCase: DeleteProjectUseCase
) {
  const router = express.Router();

  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projects = await getAllProjectsUseCase.execute();
      if (!projects?.length) {
        throw new NotFoundError("There are no projects");
      }
      return res.json(projects);
    } catch (error) {
      next(error);
    }
  });

  router.get(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const project = await getProjectUseCase.execute(id);

        if (!project) {
          throw new NotFoundError("Project not found");
        }
        return res.json(project);
      } catch (error: any) {
        next(error);
      }
    }
  );
  router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = new ProjectRequestDTO(req.body);
      const errors: any = await validate(project);
      if (errors.length) {
        throw new BadRequestError(
          Object.values(errors[0].constraints)[0] as string
        );
      }
      const projectCreated = await createProjectUseCase.execute(project);
      return res.status(201).json(projectCreated);
    } catch (error) {
      next(error);
    }
  });
  router.put(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const project = req.body;
        const projectExists = await getProjectUseCase.execute(id);
        if (!projectExists) {
          throw new BadRequestError("This project does not exist");
        }
        await updateProjectUseCase.execute(id, project);
        return res.json({ message: "Project updated" });
      } catch (error) {
        next(error);
      }
    }
  );
  router.delete(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const projectExists = await getProjectUseCase.execute(id);
        if (!projectExists) {
          throw new BadRequestError("his project does not exist");
        }
        await deleteProjectUseCase.execute(id);
        return res.json({ message: "Project deleted" });
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
}
