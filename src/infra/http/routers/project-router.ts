import { Router } from 'express';
import { responseHandler } from '@/infra/http/response-handler';
import { ProjectController } from '@/controllers';

export const projectRouter = async (
  router: Router,
  controller: ProjectController
): Promise<void> => {
  router.get('/project', responseHandler(controller.getAllProjects));
  router.get('/project/:id', responseHandler(controller.getProject));
  router.post('/project', responseHandler(controller.createProject));
  router.patch('/project/:id', responseHandler(controller.updateProject));
  router.delete('/project/:id', responseHandler(controller.deleteProject));
};
