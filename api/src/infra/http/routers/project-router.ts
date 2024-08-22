import { Router } from 'express';
import { responseHandler } from '@/infra/http/response-handler';
import { ProjectController } from '@/controllers';
import { adminMiddleware, authMiddleware, observerMiddleware, ownerMiddleware } from '@/infra/http/middlewares';

export const projectRouter = async (
  router: Router,
  controller: ProjectController
): Promise<void> => {
  router.get('/project', authMiddleware, responseHandler(controller.getAllProjects));
  router.get('/project/:projectId', authMiddleware, observerMiddleware, responseHandler(controller.getProject));
  router.post('/project', authMiddleware, responseHandler(controller.createProject));
  router.patch('/project/:projectId', authMiddleware, adminMiddleware, responseHandler(controller.updateProject));
  router.delete('/project/:projectId', authMiddleware, ownerMiddleware, responseHandler(controller.deleteProject));
};
