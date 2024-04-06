import express, { Response, Request, NextFunction } from "express";
import { NotFoundError } from "../../errors/not-found-error";
import { BadRequestError } from "../../errors/bad-request-error";
import { validate } from "../../helpers/validate";
import { Logger } from "../../../config/logger";
import * as DTO from "../dtos";
import * as UseCases from "@/domain/use-cases";

export default function ScenarioController(
  getScenario: UseCases.GetScenario,
  getScenarioWithLexicons: UseCases.GetScenarioWithLexicons,
  getAllScenarios: UseCases.GetAllScenarios,
  createScenario: UseCases.CreateScenario,
  createManyScenarios: UseCases.CreateManyScenarios,
  updateScenario: UseCases.UpdateScenario,
  deleteScenario: UseCases.DeleteScenario,
  createException: UseCases.CreateException,
  createContext: UseCases.CreateContext,
  createRestriction: UseCases.CreateRestriction,
  createActor: UseCases.CreateActor,
  createResource: UseCases.CreateResource,
  addActor: UseCases.AddActor,
  addResource: UseCases.AddResource,
  createEpisode: UseCases.CreateEpisode,
  deleteException: UseCases.DeleteException,
  deleteContext: UseCases.DeleteContext,
  deleteRestriction: UseCases.DeleteRestriction,
  deleteActor: UseCases.DeleteActor,
  deleteResource: UseCases.DeleteResource,
  removeActor: UseCases.RemoveActor,
  removeResource: UseCases.RemoveResource,
  deleteEpisode: UseCases.DeleteEpisode,
  deleteGroup: UseCases.DeleteGroup
) {
  const router = express.Router();
  const logger = Logger.getInstance();

  router.get(
    "/project/:projectId",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { projectId } = req.params;
        const scenarios = await getAllScenarios.execute(projectId);
        if (!scenarios?.length) {
          throw new NotFoundError("There are no scenarios");
        }
        return res.json(scenarios);
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );

  router.get(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const scenario = await getScenario.execute(id);
        if (!scenario) {
          throw new NotFoundError("Scenario not found");
        }
        return res.json(scenario);
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );
  router.get(
    "/:id/with-lexicons",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const scenario = await getScenarioWithLexicons.execute(id);
        if (!scenario) {
          throw new NotFoundError("Scenario not found");
        }
        return res.json(scenario);
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );
  router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const scenario = new DTO.CreateScenarioRequestDTO(req.body);
      await validate(scenario);
      const scenarioCreated = await createScenario.execute(scenario);
      return res.status(201).json(scenarioCreated);
    } catch (error: any) {
      logger.error(error);
      next(error);
    }
  });

  router.post(
    "/many",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = new DTO.CreateManyScenariosRequestDTO(req.body);
        await validate(data);
        const scenariosCreated = await createManyScenarios.execute(data);
        return res.status(201).json(scenariosCreated);
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );

  router.post(
    "/exception",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const exception = new DTO.CreateExceptionRequestDTO(req.body);
        await validate(exception);
        await createException.execute(exception);
        return res.status(201).json({ message: "Exception created" });
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );
  router.post(
    "/context",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const context = new DTO.CreateContextRequestDTO(req.body);
        await validate(context);
        await createContext.execute(context);
        return res.status(201).json({ message: "Context created" });
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );
  router.post(
    "/restriction",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const restriction = new DTO.CreateRestrictionRequestDTO(req.body);
        await validate(restriction);
        await createRestriction.execute(restriction);
        return res.status(201).json({ message: "Restriction created" });
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );
  router.post(
    "/actor",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const actor = new DTO.CreateActorRequestDTO(req.body);
        await validate(actor);
        await createActor.execute(actor);
        return res.status(201).json({ message: "Actor created" });
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );
  router.post(
    "/resource",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const resource = new DTO.CreateResourceRequestDTO(req.body);
        await validate(resource);
        await createResource.execute(resource);
        return res.status(201).json({ message: "Resource created" });
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );
  router.post(
    "/:scenarioId/actor/:actorId",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { scenarioId, actorId } = req.params;
        await addActor.execute({
          scenarioId: +scenarioId,
          actorId: +actorId,
        });
        return res.status(201).json({ message: "Actor added" });
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );
  router.post(
    "/:scenarioId/resource/:resourceId",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { scenarioId, resourceId } = req.params;
        await addResource.execute({
          scenarioId: +scenarioId,
          resourceId: +resourceId,
        });
        return res.status(201).json({ message: "Resource added" });
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );
  router.post(
    "/episode",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const episode = new DTO.CreateEpisodeRequestDTO(req.body);
        await validate(episode);
        await createEpisode.execute(episode);
        return res.status(201).json({ message: "Episode created" });
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );
  router.delete(
    "/exception/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        await deleteException.execute(id);
        return res.json({ message: "Exception deleted" });
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );
  router.delete(
    "/context/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        await deleteContext.execute(id);
        return res.json({ message: "Context deleted" });
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );
  router.delete(
    "/restriction/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        await deleteRestriction.execute(id);
        return res.json({ message: "Restriction deleted" });
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );
  router.delete(
    "/actor/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        await deleteActor.execute(id);
        return res.json({ message: "Actor deleted" });
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );
  router.delete(
    "/resource/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        await deleteResource.execute(id);
        return res.json({ message: "Resource deleted" });
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );
  router.delete(
    "/episode/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        await deleteEpisode.execute(id);
        return res.json({ message: "Episode deleted" });
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );
  router.delete(
    "/group/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        await deleteGroup.execute(id);
        return res.json({ message: "group deleted" });
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );
  router.delete(
    "/:scenarioId/actor/:actorId",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { scenarioId, actorId } = req.params;
        await removeActor.execute({
          scenarioId: +scenarioId,
          actorId: +actorId,
        });
        return res.json({ message: "Actor removed" });
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );
  router.delete(
    "/:scenarioId/resource/:resourceId",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { scenarioId, resourceId } = req.params;
        await removeResource.execute({
          scenarioId: +scenarioId,
          resourceId: +resourceId,
        });
        return res.json({ message: "Resource removed" });
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );
  router.delete(
    "/actor/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        await deleteRestriction.execute(id);
        return res.json({ message: "Restriction deleted" });
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );
  router.patch(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const scenario = new DTO.UpdateScenarioRequestDTO(req.body);
        await validate(scenario);
        const scenarioExists = await getScenario.execute(id);
        if (!scenarioExists) {
          throw new BadRequestError("This scenario does not exist");
        }
        await updateScenario.execute({ id, scenario });
        return res.json({ message: "Scenario updated" });
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
        const scenarioExists = await getScenario.execute(id);
        if (!scenarioExists) {
          throw new BadRequestError("his scenario does not exist");
        }
        await deleteScenario.execute(id);
        return res.json({ message: "Scenario deleted" });
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );

  return router;
}
