import { CreateScenarioUseCase } from "../../domain/interfaces/use-cases/scenario/create-scenario";
import { GetAllScenariosUseCase } from "../../domain/interfaces/use-cases/scenario/get-all-scenarios";
import { GetScenarioUseCase } from "../../domain/interfaces/use-cases/scenario/get-scenario";
import { UpdateScenarioUseCase } from "../../domain/interfaces/use-cases/scenario/update-scenario";
import { DeleteScenarioUseCase } from "../../domain/interfaces/use-cases/scenario/delete-scenario";
import express, { Response, Request, NextFunction } from "express";
import { NotFoundError } from "../errors/not-found-error";
import { BadRequestError } from "../errors/bad-request-error";

export default function ScenarioRouter(
  getScenarioUseCase: GetScenarioUseCase,
  getAllScenariosUseCase: GetAllScenariosUseCase,
  createScenarioUseCase: CreateScenarioUseCase,
  updateScenarioUseCase: UpdateScenarioUseCase,
  deleteScenarioUseCase: DeleteScenarioUseCase
) {
  const router = express.Router();

  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const scenarios = await getAllScenariosUseCase.execute();
      if (!scenarios?.length) {
        throw new NotFoundError("There are no scenarios");
      }
      return res.json(scenarios);
    } catch (error) {
      next(error);
    }
  });

  router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const scenario = await getScenarioUseCase.execute(id);
        if (!scenario) {
          throw new NotFoundError("Scenario not found");
        }
        return res.json(scenario);
      } catch (error: any) {
        next(error);
      }
    }
  );
  router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const scenario = req.body;
      const scenarioCreated = await createScenarioUseCase.execute(scenario);
      return res.status(201).json(scenarioCreated);
    } catch (error) {
      next(error);
    }
  });
  router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const scenario = req.body;
        const scenarioExists = await getScenarioUseCase.execute(id);
        if (!scenarioExists) {
          throw new BadRequestError("This scenario does not exist");
        }
        const scenarioUpdated = await updateScenarioUseCase.execute(id, scenario);
        return res.json(scenarioUpdated);
      } catch (error) {
        next(error);
      }
    }
  );
  router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const scenarioExists = await getScenarioUseCase.execute(id);
        if (!scenarioExists) {
          throw new BadRequestError("his scenario does not exist");
        }
        await deleteScenarioUseCase.execute(id);
        return res.json({ message: "Scenario deleted" });
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
}
