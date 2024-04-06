import express, { Response, Request, NextFunction } from "express";
import { NotFoundError } from "../../errors/not-found-error";
import { BadRequestError } from "../../errors/bad-request-error";
import { validate } from "../../helpers/validate";
import * as DTO from "../dtos";
import * as UseCases from "@/domain/use-cases";
import { Logger } from "../../../config/logger";

export default function SymbolController(
  getSymbol: UseCases.GetSymbol,
  getAllSymbols: UseCases.GetAllSymbols,
  createSymbol: UseCases.CreateSymbol,
  updateSymbol: UseCases.UpdateSymbol,
  deleteSymbol: UseCases.DeleteSymbol,
  createImpact: UseCases.CreateImpact,
  createSynonym: UseCases.CreateSynonym,
  deleteImpact: UseCases.DeleteImpact,
  deleteSynonym: UseCases.DeleteSynonym
) {
  const router = express.Router();
  const logger = Logger.getInstance();

  router.get(
    "/project/:projectId",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { projectId } = req.params;
        const symbols = await getAllSymbols.execute(projectId);
        if (!symbols?.length) {
          throw new NotFoundError("There are no symbols");
        }
        return res.json(symbols);
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
        const symbol = await getSymbol.execute(id);
        if (!symbol) {
          throw new NotFoundError("Symbol not found");
        }
        return res.json(symbol);
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );
  router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const symbol = new DTO.CreateSymbolRequestDTO(req.body);
      await validate(symbol);
      const symbolCreated = await createSymbol.execute(symbol);
      return res.status(201).json(symbolCreated);
    } catch (error: any) {
      logger.error(error);
      next(error);
    }
  });
  router.post(
    "/impact",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const impact = new DTO.CreateImpactRequestDTO(req.body);
        await validate(impact);
        await createImpact.execute(impact);
        return res.status(201).json({ message: "Impact created" });
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );
  router.post(
    "/synonym",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const synonym = new DTO.CreateSynonymRequestDTO(req.body);
        await validate(synonym);
        await createSynonym.execute(synonym);
        return res.status(201).json({ message: "Synonym created" });
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
        const symbol = new DTO.UpdateSymbolRequestDTO(req.body);
        await validate(symbol);
        const symbolExists = await getSymbol.execute(id);
        if (!symbolExists) {
          throw new BadRequestError("This symbol does not exist");
        }
        await updateSymbol.execute({ id, symbol });
        return res.json({ message: "Symbol updated" });
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
        const symbolExists = await getSymbol.execute(id);
        if (!symbolExists) {
          throw new BadRequestError("his symbol does not exist");
        }
        await deleteSymbol.execute(id);
        return res.json({ message: "Symbol deleted" });
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );
  router.delete(
    "/impact/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        await deleteImpact.execute(id);
        return res.json({ message: "Impact deleted" });
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );
  router.delete(
    "/synonym/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        await deleteSynonym.execute(id);
        return res.json({ message: "Synonym deleted" });
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );

  return router;
}
