import { Router } from 'express';
import { responseHandler } from '@/infra/http/response-handler';
import { UserController } from '@/controllers';
import { administradorMiddleware, authMiddleware } from '../middlewares';

export const userRouter = async (
  router: Router,
  controller: UserController
): Promise<void> => {
  router.get('/user/me', authMiddleware, responseHandler(controller.getMe));
  router.post('/user/register', responseHandler(controller.createUser));
  router.post(
    '/user/auth',
    responseHandler(controller.authenticateUser)
  );
  router.post(
    '/user/add/:projectId', authMiddleware, administradorMiddleware,
    responseHandler(controller.addUserToProject)
  );
  router.post(
    '/user/add/:projectId', authMiddleware, administradorMiddleware,
    responseHandler(controller.addUserToProject)
  );
  router.patch(
    '/user/change-role/:projectId', authMiddleware, administradorMiddleware,
    responseHandler(controller.changeUserRole)
  );
  router.patch(
    '/user/remove/:projectId', authMiddleware, administradorMiddleware,
    responseHandler(controller.removeUserFromProject)
  );
  router.patch(
    '/user',
    authMiddleware,
    responseHandler(controller.updateUser)
  );
};
