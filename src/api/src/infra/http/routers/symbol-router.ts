import { Router } from 'express';
import { responseHandler } from '@/infra/http/response-handler';
import { SymbolController } from '@/controllers';
import { authMiddleware } from '@/infra/http/middlewares';

export const symbolRouter = async (
  router: Router,
  controller: SymbolController
): Promise<void> => {
  router.get(
    '/project/:projectId/symbol',
    authMiddleware,
    responseHandler(controller.getAllSymbols)
  );
  router.get(
    '/project/:projectId/symbol/:id',
    authMiddleware,
    responseHandler(controller.getSymbol)
  );
  router.post(
    '/project/:projectId/symbol',
    authMiddleware,
    responseHandler(controller.createSymbol)
  );
  router.patch(
    '/project/:projectId/symbol/:id',
    authMiddleware,
    responseHandler(controller.updateSymbol)
  );
  router.delete(
    '/project/:projectId/symbol/:id',
    authMiddleware,
    responseHandler(controller.deleteSymbol)
  );
};
