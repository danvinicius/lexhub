import { Router } from 'express';
import { responseHandler } from '@/infra/http/response-handler';
import { UserController } from '@/controllers';

export const userRouter = async (
  router: Router,
  controller: UserController
): Promise<void> => {
  router.post('/user/register', responseHandler(controller.createUser));
  router.post(
    '/user/authenticate',
    responseHandler(controller.authenticateUser)
  );
};
