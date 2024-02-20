import { CreateScenarioUseCase } from "../../../core/domain/use-cases/scenario/interfaces/create-scenario";
import { GetAllScenariosUseCase } from "../../../core/domain/use-cases/scenario/interfaces/get-all-scenarios";
import { GetScenarioUseCase } from "../../../core/domain/use-cases/scenario/interfaces/get-scenario";
import { UpdateScenarioUseCase } from "../../../core/domain/use-cases/scenario/interfaces/update-scenario";
import { DeleteScenarioUseCase } from "../../../core/domain/use-cases/scenario/interfaces/delete-scenario";
import express, { Response, Request, NextFunction } from "express";
import { NotFoundError } from "../../errors/not-found-error";
import { BadRequestError } from "../../errors/bad-request-error";
import { CreateScenarioRequestDTO } from "../dtos/create-scenario-request-dto";
import { validate } from "../../helpers/validate";
import { UpdateScenarioRequestDTO } from "../dtos/update-scenario-request-dto";
import { GetScenarioWithLexiconsUseCase } from "../../../core/domain/use-cases/scenario/interfaces/get-scenario-with-lexicons-use-case";
import { Logger } from "../../../config/logger"

export default function ScenarioController(
  getScenarioUseCase: GetScenarioUseCase,
  getScenarioWithLexiconsUseCase: GetScenarioWithLexiconsUseCase,
  getAllScenariosUseCase: GetAllScenariosUseCase,
  createScenarioUseCase: CreateScenarioUseCase,
  updateScenarioUseCase: UpdateScenarioUseCase,
  deleteScenarioUseCase: DeleteScenarioUseCase
) {
  const router = express.Router();
  const logger = Logger.getInstance()

  router.get("/project/:projectId", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params;
      const scenarios = await getAllScenariosUseCase.execute(projectId);
      if (!scenarios?.length) {
        throw new NotFoundError("There are no scenarios");
      }
      return res.json(scenarios);
    } catch (error: any) {
      logger.error(error.message)
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
        logger.error(error.message)
        next(error);
      }
    }
  );
  router.get("/:id/with-lexicons", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const scenario = await getScenarioWithLexiconsUseCase.execute(id);
      if (!scenario) {
        throw new NotFoundError("Scenario not found");
      }
      return res.json(scenario);
    } catch (error: any) {
      logger.error(error.message)
      next(error);
    }
  }
);
  router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const scenario = new CreateScenarioRequestDTO(req.body);
      await validate(scenario)
      const scenarioCreated = await createScenarioUseCase.execute(scenario);
      return res.status(201).json(scenarioCreated);
    } catch (error: any) {
      logger.error(error.message)
      next(error);
    }
  });
  router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const scenario = new UpdateScenarioRequestDTO(req.body);
      await validate(scenario)
        const scenarioExists = await getScenarioUseCase.execute(id);
        if (!scenarioExists) {
          throw new BadRequestError("This scenario does not exist");
        }
        await updateScenarioUseCase.execute(id, scenario);
        return res.json({ message: "Scenario updated" });
      } catch (error: any) {
        logger.error(error.message)
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
      } catch (error: any) {
        logger.error(error.message)
        next(error);
      }
    }
  );

  return router;
}
