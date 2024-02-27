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
import { CreateExceptionRequestDTO } from "../dtos/create-exception-request-dto";
import { CreateExceptionUseCase } from "../../../core/domain/use-cases/scenario/interfaces/create-exception";
import { CreateContextUseCase } from "../../../core/domain/use-cases/scenario/interfaces/create-context";
import { DeleteContextUseCase } from "../../../core/domain/use-cases/scenario/interfaces/delete-context";
import { DeleteExceptionUseCase } from "../../../core/domain/use-cases/scenario/interfaces/delete-exception";
import { DeleteRestrictionUseCase } from "../../../core/domain/use-cases/scenario/interfaces/delete-restriction";
import { CreateRestrictionUseCase } from "../../../core/domain/use-cases/scenario/interfaces/create-restriction";
import { CreateActorUseCase } from "../../../core/domain/use-cases/scenario/interfaces/create-actor";
import { AddActorUseCase } from "../../../core/domain/use-cases/scenario/interfaces/add-actor";
import { DeleteActorUseCase } from "../../../core/domain/use-cases/scenario/interfaces/delete-actor";
import { RemoveActorUseCase } from "../../../core/domain/use-cases/scenario/interfaces/remove-actor";
import { CreateContextRequestDTO } from "../dtos/create-context-request-dto";
import { CreateRestrictionRequestDTO } from "../dtos/create-restriction-request-dto";
import { CreateActorRequestDTO } from "../dtos/create-actor-request-dto";
import { CreateEpisodeRequestDTO } from "../dtos/create-episode.request-dto";
import { CreateEpisodeUseCase } from "../../../core/domain/use-cases/scenario/interfaces/create-episode";

export default function ScenarioController(
  getScenarioUseCase: GetScenarioUseCase,
  getScenarioWithLexiconsUseCase: GetScenarioWithLexiconsUseCase,
  getAllScenariosUseCase: GetAllScenariosUseCase,
  createScenarioUseCase: CreateScenarioUseCase,
  updateScenarioUseCase: UpdateScenarioUseCase,
  deleteScenarioUseCase: DeleteScenarioUseCase,
  createExceptionUseCase: CreateExceptionUseCase,
  createContextUseCase: CreateContextUseCase,
  createRestrictionUseCase: CreateRestrictionUseCase,
  createActorUseCase: CreateActorUseCase,
  addActorUseCase: AddActorUseCase,
  createEpisodeUseCase: CreateEpisodeUseCase,
  deleteExceptionUseCase: DeleteExceptionUseCase,
  deleteContextUseCase: DeleteContextUseCase,
  deleteRestrictionUseCase: DeleteRestrictionUseCase,
  deleteActorUseCase: DeleteActorUseCase,
  removeActorUseCase: RemoveActorUseCase,
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
  router.post("/exception", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const exception = new CreateExceptionRequestDTO(req.body);
      await validate(exception);
      await createExceptionUseCase.execute(exception);
      return res.status(201).json({ message: "Exception created" });
    } catch (error: any) {
      logger.error(error.message)
      next(error);
    }
  });
  router.post("/context", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const context = new CreateContextRequestDTO(req.body);
      await validate(context);
      await createContextUseCase.execute(context);
      return res.status(201).json({ message: "Context created" });
    } catch (error: any) {
      logger.error(error.message)
      next(error);
    }
  });
  router.post("/restriction", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const restriction = new CreateRestrictionRequestDTO(req.body);
      await validate(restriction);
      await createRestrictionUseCase.execute(restriction);
      return res.status(201).json({ message: "Restriction created" });
    } catch (error: any) {
      logger.error(error.message)
      next(error);
    }
  });
  router.post("/actor", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const actor = new CreateActorRequestDTO(req.body);
      await validate(actor);
      await createActorUseCase.execute(actor);
      return res.status(201).json({ message: "Actor created" });
    } catch (error: any) {
      logger.error(error.message)
      next(error);
    }
  });
  router.post("/:scenarioId/actor/:actorId", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { scenarioId, actorId } = req.params;
      await addActorUseCase.execute(scenarioId, actorId);
      return res.status(201).json({ message: "Actor added" });
    } catch (error: any) {
      logger.error(error.message)
      next(error);
    }
  });
  router.post("/episode", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const episode = new CreateEpisodeRequestDTO(req.body);
      await validate(episode);
      await createEpisodeUseCase.execute(episode);
      return res.status(201).json({ message: "Episode created" });
    } catch (error: any) {
      logger.error(error.message)
      next(error);
    }
  });
  router.delete("/exception/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await deleteExceptionUseCase.execute(id);
      return res.json({ message: "Exception deleted" });
    } catch (error: any) {
      logger.error(error.message)
      next(error);
    }
  }
  );
  router.delete("/context/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await deleteContextUseCase.execute(id);
      return res.json({ message: "Context deleted" });
    } catch (error: any) {
      logger.error(error.message)
      next(error);
    }
  }
  );
  router.delete("/restriction/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await deleteRestrictionUseCase.execute(id);
      return res.json({ message: "Restriction deleted" });
    } catch (error: any) {
      logger.error(error.message)
      next(error);
    }
  }
  );
  router.delete("/actor/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await deleteActorUseCase.execute(id);
      return res.json({ message: "Actor deleted" });
    } catch (error: any) {
      logger.error(error.message)
      next(error);
    }
  }
  );
  router.delete("/:scenarioId/actor/:actorId", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { scenarioId, actorId} = req.params;
      await removeActorUseCase.execute(actorId, scenarioId);
      return res.json({ message: "Actor removed" });
    } catch (error: any) {
      logger.error(error.message)
      next(error);
    }
  }
  );
  router.delete("/actor/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await deleteRestrictionUseCase.execute(id);
      return res.json({ message: "Restriction deleted" });
    } catch (error: any) {
      logger.error(error.message)
      next(error);
    }
  }
  );
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
