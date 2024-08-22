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
  InvalidParamError,
  MissingParamError,
  NotFoundError,
} from '@/utils/errors';

import { ProjectService } from '@/services';

const projectService = new ProjectService();

export class ProjectController {
  public getAllProjects = async (req: Request) => {
    try {
      const projects = await projectService.getAllProjects(req.user);
      return ok(projects);
    } catch (error: any) {
      return serverError(error);
    }
  };

  public getProject = async (req: Request) => {
    try {
      const { projectId } = req.params;
      const project = await projectService.getProject(+projectId);
      return ok(project);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        return notFound(error);
      }
      return serverError(error);
    }
  };
  public createProject = async (req: Request) => {
    try {
      const data = new DTO.CreateProjectRequestDTO(req.body);
      await validate(data);
      const projectCreated = await projectService.createProject(data, req.user);
      return created(projectCreated);
    } catch (error: any) {
      if (
        error instanceof InvalidParamError ||
        error instanceof MissingParamError
      ) {
        return badRequest(error);
      }
      return serverError(error);
    }
  };
  public updateProject = async (req: Request) => {
    try {
      const { projectId } = req.params;
      const data = new DTO.UpdateProjectRequestDTO(req.body);
      await validate(data);
      await projectService.updateProject(+projectId, data);
      return ok({ message: 'Project updated' });
    } catch (error: any) {
      if (
        error instanceof BadRequestError ||
        error instanceof MissingParamError
      ) {
        return badRequest(error);
      }
      return serverError(error);
    }
  };
  public deleteProject = async (req: Request) => {
    try {
      const { projectId } = req.params;
      await projectService.deleteProject(+projectId);
      return ok({ message: 'Project deleted' });
    } catch (error: any) {
      return serverError(error);
    }
  };
}
