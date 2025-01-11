import { Request } from 'express';
import {
  ok,
  serverError,
} from '@/infra/http/response';
import { ChangeService } from '@/services';

const changeService = new ChangeService();

export class ChangeController {
  getChangesByUserProjects = async (req: Request) => {
    try {
      const changes = await changeService.getChangesByUserProjects(req.userId || '');
      return ok(changes);
    } catch (error: any) {
      return serverError(error.message);
    }
  };
}
