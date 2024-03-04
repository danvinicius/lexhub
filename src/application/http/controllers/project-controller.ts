import { CreateProjectUseCase } from "../../../core/domain/use-cases/project/interfaces"
import { GetAllProjectsUseCase } from "../../../core/domain/use-cases/project/interfaces"
import { GetProjectUseCase } from "../../../core/domain/use-cases/project/interfaces"
import { UpdateProjectUseCase } from "../../../core/domain/use-cases/project/interfaces"
import { DeleteProjectUseCase } from "../../../core/domain/use-cases/project/interfaces"
import express, { Response, Request, NextFunction } from "express";
import { NotFoundError } from "../../errors/not-found-error";
import { BadRequestError } from "../../errors/bad-request-error";
import { CreateProjectRequestDTO } from "../dtos/create-project-request-dto"
import { UpdateProjectRequestDTO } from "../dtos/update-project-request-dto"
import { validate } from "../../helpers/validate";
import { Logger } from "../../../config/logger"

export default function ProjectController(
  getProjectUseCase: GetProjectUseCase,
  getAllProjectsUseCase: GetAllProjectsUseCase,
  createProjectUseCase: CreateProjectUseCase,
  updateProjectUseCase: UpdateProjectUseCase,
  deleteProjectUseCase: DeleteProjectUseCase
) {
  const router = express.Router();
  const logger = Logger.getInstance()

  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projects = await getAllProjectsUseCase.execute();
      if (!projects?.length) {
        throw new NotFoundError("There are no projects");
      }
      return res.json(projects);
    } catch (error: any) {
      logger.error(error)
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
        logger.error(error)
        next(error);
      }
    }
  );
  router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = new CreateProjectRequestDTO(req.body);
      await validate(project)
      const projectCreated = await createProjectUseCase.execute(project);
      return res.status(201).json(projectCreated);
    } catch (error: any) {
      logger.error(error)
      next(error);
    }
  });
  router.patch(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const project = new UpdateProjectRequestDTO(req.body);
        await validate(project)
        await updateProjectUseCase.execute({id, project});
        return res.json({ message: "Project updated" });
      } catch (error: any) {
        logger.error(error)
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
      } catch (error: any) {
        logger.error(error)
        next(error);
      }
    }
  );

  return router;
}
