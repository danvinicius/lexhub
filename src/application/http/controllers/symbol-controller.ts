import { CreateSymbolUseCase } from "../../../core/domain/use-cases/symbol/interfaces";
import { GetAllSymbolsUseCase } from "../../../core/domain/use-cases/symbol/interfaces/";
import { GetSymbolUseCase } from "../../../core/domain/use-cases/symbol/interfaces";
import { UpdateSymbolUseCase } from "../../../core/domain/use-cases/symbol/interfaces";
import { DeleteSymbolUseCase } from "../../../core/domain/use-cases/symbol/interfaces/";
import express, { Response, Request, NextFunction } from "express";
import { NotFoundError } from "../../errors/not-found-error";
import { BadRequestError } from "../../errors/bad-request-error";
import { validate } from "../../helpers/validate";
import { CreateSymbolRequestDTO } from "../dtos/create-symbol-request-dto";
import { UpdateSymbolRequestDTO } from "../dtos/update-symbol-request-dto";
import { CreateImpactRequestDTO } from "../dtos/create-impact-request-dto";
import { CreateImpactUseCase } from "../../../core/domain/use-cases/symbol/interfaces";
import { CreateSynonymUseCase } from "../../../core/domain/use-cases/symbol/interfaces";
import { CreateSynonymRequestDTO } from "../dtos/create-synonym-request-dto";
import { DeleteImpactUseCase } from "../../../core/domain/use-cases/symbol/interfaces";
import { DeleteSynonymUseCase } from "../../../core/domain/use-cases/symbol/interfaces";
import { Logger } from "../../../config/logger"

export default function SymbolController(
  getSymbolUseCase: GetSymbolUseCase,
  getAllSymbolsUseCase: GetAllSymbolsUseCase,
  createSymbolUseCase: CreateSymbolUseCase,
  updateSymbolUseCase: UpdateSymbolUseCase,
  deleteSymbolUseCase: DeleteSymbolUseCase,
  createImpactUseCase: CreateImpactUseCase,
  createSynonymUseCase: CreateSynonymUseCase,
  deleteImpact: DeleteImpactUseCase,
  deleteSynonym: DeleteSynonymUseCase,
) {
  const router = express.Router();
  const logger = Logger.getInstance()

  router.get("/project/:projectId", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params;
      const symbols = await getAllSymbolsUseCase.execute(projectId);
      if (!symbols?.length) {
        throw new NotFoundError("There are no symbols");
      }
      return res.json(symbols);
    } catch (error: any) {
      logger.error(error)
      next(error);
    }
  });

  router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const symbol = await getSymbolUseCase.execute(id);
      if (!symbol) {
        throw new NotFoundError("Symbol not found");
      }
      return res.json(symbol);
    } catch (error: any) {
      logger.error(error)
      next(error);
    }
  }
  );
  router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const symbol = new CreateSymbolRequestDTO(req.body);
      await validate(symbol);
      const symbolCreated = await createSymbolUseCase.execute(symbol);
      return res.status(201).json(symbolCreated);
    } catch (error: any) {
      logger.error(error)
      next(error);
    }
  });
  router.post("/impact", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const impact = new CreateImpactRequestDTO(req.body);
      await validate(impact);
      await createImpactUseCase.execute(impact);
      return res.status(201).json({ message: "Impact created" });
    } catch (error: any) {
      logger.error(error)
      next(error);
    }
  });
  router.post("/synonym", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const synonym = new CreateSynonymRequestDTO(req.body);
      await validate(synonym);
      await createSynonymUseCase.execute(synonym);
      return res.status(201).json({ message: "Synonym created" });
    } catch (error: any) {
      logger.error(error)
      next(error);
    }
  });
  router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const symbol = new UpdateSymbolRequestDTO(req.body);
      await validate(symbol);
      const symbolExists = await getSymbolUseCase.execute(id);
      if (!symbolExists) {
        throw new BadRequestError("This symbol does not exist");
      }
      await updateSymbolUseCase.execute({id, symbol});
      return res.json({ message: "Symbol updated" });
    } catch (error: any) {
      logger.error(error)
      next(error);
    }
  }
  );
  router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const symbolExists = await getSymbolUseCase.execute(id);
      if (!symbolExists) {
        throw new BadRequestError("his symbol does not exist");
      }
      await deleteSymbolUseCase.execute(id);
      return res.json({ message: "Symbol deleted" });
    } catch (error: any) {
      logger.error(error)
      next(error);
    }
  }
  );
  router.delete("/impact/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await deleteImpact.execute(id);
      return res.json({ message: "Impact deleted" });
    } catch (error: any) {
      logger.error(error)
      next(error);
    }
  }
  );
  router.delete("/synonym/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await deleteSynonym.execute(id);
      return res.json({ message: "Synonym deleted" });
    } catch (error: any) {
      logger.error(error)
      next(error);
    }
  }
  );

  return router;
}
