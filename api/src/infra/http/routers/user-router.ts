import { Router } from 'express';
import { responseHandler } from '@/infra/http/response-handler';
import { UserController } from '@/controllers';
import { adminMiddleware, authMiddleware } from '../middlewares';

export const userRouter = async (
  router: Router,
  controller: UserController
): Promise<void> => {
  router.post('/user/register', responseHandler(controller.createUser));
  router.post(
    '/user/auth',
    responseHandler(controller.authenticateUser)
  );
  router.post(
    '/user/add/:projectId', authMiddleware, adminMiddleware,
    responseHandler(controller.addUserToProject)
  );
};
