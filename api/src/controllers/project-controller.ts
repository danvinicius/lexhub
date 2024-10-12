import { Request } from 'express';
import * as DTO from '@/infra/http/dtos';
import { validate } from '@/utils/validation/validate';
import {
  badRequest,
  created,
  notFound,
  ok,
  serverError,
} from '@/infra/http/response';
import {
  BadRequestError,
  NotFoundError,
} from '@/utils/errors';

import { ProjectService } from '@/services';

const projectService = new ProjectService();

export class ProjectController {
  public getAllProjects = async (req: Request) => {
    try {
      const projects = await projectService.getAllProjects(req.userId);
      return ok(projects);
    } catch (error: any) {
      return serverError(error.message);
    }
  };

  public getProject = async (req: Request) => {
    try {
      const { projectId } = req.params;
      const project = await projectService.getProject(projectId);
      return ok(project);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        return notFound(error.message);
      }
      return serverError(error.message);
    }
  };
  public createProject = async (req: Request) => {
    try {
      const data = new DTO.CreateProjectRequestDTO(req.body);
      
      await validate(data);
      const projectCreated = await projectService.createProject(data, req.userId);
      return created(projectCreated);
    } catch (error: any) {
      if (
        error instanceof BadRequestError
      ) {
        return badRequest(error.message);
      }
      return serverError(error.message);
    }
  };
  public updateProject = async (req: Request) => {
    try {
      const { projectId } = req.params;
      const data = new DTO.UpdateProjectRequestDTO(req.body);
      await validate(data);
      await projectService.updateProject(projectId, data);
      return ok({ message: 'Project updated' });
    } catch (error: any) {
      if (
        error instanceof BadRequestError
      ) {
        return badRequest(error.message);
      }
      return serverError(error.message);
    }
  };
  public deleteProject = async (req: Request) => {
    try {
      const { projectId } = req.params;
      await projectService.deleteProject(projectId);
      return ok({ message: 'Project deleted' });
    } catch (error: any) {
      return serverError(error.message);
    }
  };
}
