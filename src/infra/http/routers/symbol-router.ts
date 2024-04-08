import { Router } from "express";
import { responseHandler } from "@/infra/http/response-handler";
import { SymbolController } from "@/controllers";

export const symbolRouter = async (
  router: Router,
  controller: SymbolController
): Promise<void> => {
  router.get("/symbol", responseHandler(controller.getAllSymbols));
  router.get("/symbol/:id", responseHandler(controller.getSymbol));
  router.post("/symbol", responseHandler(controller.createSymbol));
  router.post("/symbol/impact", responseHandler(controller.createImpact));
  router.post("/symbol/synonym", responseHandler(controller.createSynonym));
  router.patch("/symbol/:id", responseHandler(controller.updateSymbol));
  router.delete("/symbol/:id", responseHandler(controller.deleteSymbol));
  router.delete("/symbol/impact/:id", responseHandler(controller.deleteImpact));
  router.delete("/symbol/synonym:id", responseHandler(controller.deleteSynonym));
};
