import {
  CreateProject,
  GetAllProjects,
  GetProject,
  UpdateProject,
  DeleteProject,
} from "@/domain/use-cases/project";
import express, { Response, Request, NextFunction } from "express";
import { NotFoundError } from "../../errors/not-found-error";
import { BadRequestError } from "../../errors/bad-request-error";
import { CreateProjectRequestDTO } from "../dtos";
import { UpdateProjectRequestDTO } from "../dtos";
import { validate } from "../../helpers/validate";
import { Logger } from "@/config/logger";

export default function ProjectController(
  getProject: GetProject,
  getAllProjects: GetAllProjects,
  createProject: CreateProject,
  updateProject: UpdateProject,
  deleteProject: DeleteProject
) {
  const router = express.Router();
  const logger = Logger.getInstance();

  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projects = await getAllProjects.execute();
      if (!projects?.length) {
        throw new NotFoundError("There are no projects");
      }
      return res.json(projects);
    } catch (error: any) {
      logger.error(error);
      next(error);
    }
  });

  // TODO: ajustar os códigos que estão retornando errado
  router.get(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const project = await getProject.execute(id);

        if (!project) {
          throw new NotFoundError("Project not found");
        }
        return res.json(project);
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );
  router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = new CreateProjectRequestDTO(req.body);
      await validate(project);
      const projectCreated = await createProject.execute(project);
      return res.status(201).json(projectCreated);
    } catch (error: any) {
      logger.error(error);
      next(error);
    }
  });
  router.patch(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const project = new UpdateProjectRequestDTO(req.body);
        await validate(project);
        await updateProject.execute({ id, project });
        return res.json({ message: "Project updated" });
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );
  router.delete(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const projectExists = await getProject.execute(id);
        if (!projectExists) {
          throw new BadRequestError("his project does not exist");
        }
        await deleteProject.execute(id);
        return res.json({ message: "Project deleted" });
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );

  return router;
}
