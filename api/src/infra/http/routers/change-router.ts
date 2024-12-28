import { Router } from 'express';
import { responseHandler } from '@/infra/http/response-handler';
import { ChangeController } from '@/controllers';
import { authMiddleware } from '../middlewares';

export const changeRouter = async (
  router: Router,
  controller: ChangeController
): Promise<void> => {
  router.get('/change/all', authMiddleware, responseHandler(controller.getChangesByUserProjects));
};
