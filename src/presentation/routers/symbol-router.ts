import { CreateSymbolUseCase } from "../../domain/interfaces/use-cases/symbol/create-symbol";
import { GetAllSymbolsUseCase } from "../../domain/interfaces/use-cases/symbol/get-all-symbols";
import { GetSymbolUseCase } from "../../domain/interfaces/use-cases/symbol/get-symbol";
import { UpdateSymbolUseCase } from "../../domain/interfaces/use-cases/symbol/update-symbol";
import { DeleteSymbolUseCase } from "../../domain/interfaces/use-cases/symbol/delete-symbol";
import express, { Response, Request, NextFunction } from "express";
import { NotFoundError } from "../errors/not-found-error";
import { BadRequestError } from "../errors/bad-request-error";

export default function SymbolRouter(
  getSymbolUseCase: GetSymbolUseCase,
  getAllSymbolsUseCase: GetAllSymbolsUseCase,
  createSymbolUseCase: CreateSymbolUseCase,
  updateSymbolUseCase: UpdateSymbolUseCase,
  deleteSymbolUseCase: DeleteSymbolUseCase
) {
  const router = express.Router();

  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const symbols = await getAllSymbolsUseCase.execute();
      if (!symbols?.length) {
        throw new NotFoundError("There are no symbols");
      }
      return res.json(symbols);
    } catch (error) {
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
        next(error);
      }
    }
  );
  router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const symbol = req.body;
      const symbolId = await createSymbolUseCase.execute(symbol);
      return res.status(201).json({symbolId});
    } catch (error) {
      next(error);
    }
  });
  router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const symbol = req.body;
        const symbolExists = await getSymbolUseCase.execute(id);
        if (!symbolExists) {
          throw new BadRequestError("This symbol does not exist");
        }
        await updateSymbolUseCase.execute(id, symbol);
        return res.json({ message: "Symbol updated" });
      } catch (error) {
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
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
}
