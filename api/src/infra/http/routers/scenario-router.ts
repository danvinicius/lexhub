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
  // router.get(
  //   '/project/:projectId/scenario/:id/with-lexicons',
  //   authMiddleware,
  //   observerMiddleware,
  //   responseHandler(controller.getScenarioWithLexicons)
  // );
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
  router.post(
    '/project/:projectId/scenario/:scenarioId/resource',
    authMiddleware,
    collabMiddleware,
    responseHandler(controller.createResource)
  );
  router.post(
    '/project/:projectId/scenario/:scenarioId/restriction',
    authMiddleware,
    collabMiddleware,
    responseHandler(controller.createRestriction)
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
  router.delete(
    '/project/:projectId/resource/:resourceId',
    authMiddleware,
    collabMiddleware,
    responseHandler(controller.deleteResource)
  );
  router.delete(
    '/project/:projectId/restriction/:restrictionId',
    authMiddleware,
    collabMiddleware,
    responseHandler(controller.deleteRestriction)
  );
};
