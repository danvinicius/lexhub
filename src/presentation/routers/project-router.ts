import { CreateProjectUseCase } from "../../domain/interfaces/use-cases/project/create-project";
import { GetAllProjectsUseCase } from "../../domain/interfaces/use-cases/project/get-all-projects";
import { GetProjectUseCase } from "../../domain/interfaces/use-cases/project/get-project";
import { UpdateProjectUseCase } from "../../domain/interfaces/use-cases/project/update-project";
import { DeleteProjectUseCase } from "../../domain/interfaces/use-cases/project/delete-project";
import express, { Response, Request } from "express";

export default function ProjectRouter(
  getProjectUseCase: GetProjectUseCase,
  getAllProjectsUseCase: GetAllProjectsUseCase,
  createProjectUseCase: CreateProjectUseCase,
  updateProjectUseCase: UpdateProjectUseCase,
  deleteProjectUseCase: DeleteProjectUseCase
) {
  const router = express.Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const projects = await getAllProjectsUseCase.execute();
      return res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Error fetching data" });
    }
  });

  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const project = await getProjectUseCase.execute(id);
      return res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Error fetching data" });
    }
  });
  router.post("/", async (req: Request, res: Response) => {
    try {
      const { project } = req.body;
      await createProjectUseCase.execute(project);
      return res.status(201).json({ message: "Project created" });
    } catch (error) {
      res.status(500).json({ message: "Error saving data" });
    }
  });
  router.put("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { project } = req.body;
      await updateProjectUseCase.execute(id, project);
      return res.json({ message: "Project updated" });
    } catch (error) {
      res.status(500).json({ message: "Error updating data" });
    }
  });
  router.delete("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await deleteProjectUseCase.execute(id);
      return res.json({ message: "Project deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting data" });
    }
  });

  return router;
}
