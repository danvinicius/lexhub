import { Router } from 'express';
import { responseHandler } from '@/infra/http/response-handler';
import { ScenarioController } from '@/controllers';
import { authMiddleware, colabMiddleware, observadorMiddleware } from '@/infra/http/middlewares';

export const scenarioRouter = async (
  router: Router,
  controller: ScenarioController
): Promise<void> => {
  router.get(
    '/project/:projectId/scenario',
    authMiddleware,
    observadorMiddleware,
    responseHandler(controller.getAllScenarios)
  );
  router.get(
    '/project/:projectId/scenario/:id',
    authMiddleware,
    observadorMiddleware,
    responseHandler(controller.getScenario)
  );
  router.post(
    '/project/:projectId/scenario',
    authMiddleware,
    colabMiddleware,
    responseHandler(controller.createScenario)
  );
  router.post(
    '/project/:projectId/scenario/many',
    authMiddleware,
    colabMiddleware,
    responseHandler(controller.createManyScenarios)
  );
  router.patch(
    '/project/:projectId/scenario/:id',
    authMiddleware,
    colabMiddleware,
    responseHandler(controller.updateScenario)
  );
  router.delete(
    '/project/:projectId/scenario/:id',
    authMiddleware,
    colabMiddleware,
    responseHandler(controller.deleteScenario)
  );
};
