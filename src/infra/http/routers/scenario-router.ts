import { Router } from 'express';
import { responseHandler } from '@/infra/http/response-handler';
import { ScenarioController } from '@/controllers';

export const scenarioRouter = async (
  router: Router,
  controller: ScenarioController
): Promise<void> => {
  router.get('/scenario', responseHandler(controller.getAllScenarios));
  router.get('/scenario/:id', responseHandler(controller.getScenario));
  router.get(
    '/scenario/:id/with-lexicons',
    responseHandler(controller.getScenarioWithLexicons)
  );
  router.post('/scenario', responseHandler(controller.createScenario));
  router.post(
    '/scenario/many',
    responseHandler(controller.createManyScenarios)
  );
  router.post('/scenario/actor', responseHandler(controller.createActor));
  router.post('/scenario/context', responseHandler(controller.createContext));
  router.post('/scenario/resource', responseHandler(controller.createResource));
  router.post(
    '/scenario/exception',
    responseHandler(controller.createException)
  );
  router.post('/scenario/episode', responseHandler(controller.createEpisode));
  router.post(
    '/scenario/restriction',
    responseHandler(controller.createRestriction)
  );
  router.post(
    '/scenario/:scenarioId/actor/:actorId',
    responseHandler(controller.addActor)
  );
  router.post(
    '/scenario/:scenarioId/resource/:resourceId',
    responseHandler(controller.removeActor)
  );
  router.patch('/scenario/:id', responseHandler(controller.updateScenario));
  router.delete('/scenario/:id', responseHandler(controller.deleteScenario));
  router.delete(
    '/scenario/:scenarioId/actor/:actorId',
    responseHandler(controller.addResource)
  );
  router.delete(
    '/scenario/:scenarioId/resource/:resourceId',
    responseHandler(controller.removeResource)
  );
  router.delete('/scenario/actor/:id', responseHandler(controller.deleteActor));
  router.delete(
    '/scenario/context/:id',
    responseHandler(controller.deleteContext)
  );
  router.delete(
    '/scenario/episode/:id',
    responseHandler(controller.deleteEpisode)
  );
  router.delete(
    '/scenario/exception/:id',
    responseHandler(controller.deleteException)
  );
  router.delete(
    '/scenario/resource/:id',
    responseHandler(controller.deleteResource)
  );
  router.delete(
    '/scenario/restriction/:id',
    responseHandler(controller.deleteRestriction)
  );
  router.delete('/scenario/group/:id', responseHandler(controller.deleteGroup));
};
