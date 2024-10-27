import { Router } from 'express';
import { responseHandler } from '@/infra/http/response-handler';
import { ScenarioController } from '@/controllers';
import { authMiddleware, collabMiddleware, observerMiddleware } from '@/infra/http/middlewares';

export const scenarioRouter = async (
  router: Router,
  controller: ScenarioController
): Promise<void> => {
  router.get(
    '/project/:projectId/scenario',
    authMiddleware,
    observerMiddleware,
    responseHandler(controller.getAllScenarios)
  );
  router.get(
    '/project/:projectId/scenario/:id',
    authMiddleware,
    observerMiddleware,
    responseHandler(controller.getScenario)
  );
  router.post(
    '/project/:projectId/scenario',
    authMiddleware,
    collabMiddleware,
    responseHandler(controller.createScenario)
  );
  router.post(
    '/project/:projectId/scenario/many',
    authMiddleware,
    collabMiddleware,
    responseHandler(controller.createManyScenarios)
  );
  router.patch(
    '/project/:projectId/scenario/:id',
    authMiddleware,
    collabMiddleware,
    responseHandler(controller.updateScenario)
  );
  router.delete(
    '/project/:projectId/scenario/:id',
    authMiddleware,
    collabMiddleware,
    responseHandler(controller.deleteScenario)
  );
};
