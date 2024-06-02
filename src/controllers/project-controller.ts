import { Request } from 'express';
import * as DTO from '@/infra/http/dtos';
import { validate } from '@/util/validation/validate';
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
} from '@/util/errors';
import {
  CreateProjectUseCase,
  DeleteProjectUseCase,
  GetAllProjectsUseCase,
  GetProjectUseCase,
  UpdateProjectUseCase,
} from '@/use-cases/project';

export class ProjectController {
  constructor(
    private getProjectUseCase: GetProjectUseCase,
    private getAllProjectsUseCase: GetAllProjectsUseCase,
    private createProjectUseCase: CreateProjectUseCase,
    private updateProjectUseCase: UpdateProjectUseCase,
    private deleteProjectUseCase: DeleteProjectUseCase
  ) { }

  public getAllProjects = async (req: Request) => {
    try {
      const projects = await this.getAllProjectsUseCase.execute(req.user);
      return ok(projects);
    } catch (error: any) {
      return serverError(error);
    }
  };

  public getProject = async (req: Request) => {
    try {
      const { projectId } = req.params;
      const project = await this.getProjectUseCase.execute(projectId);
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
      const projectCreated = await this.createProjectUseCase.execute(data, req.user);
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
      await this.updateProjectUseCase.execute({ id: projectId, project: data });
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
      await this.deleteProjectUseCase.execute(projectId);
      return ok({ message: 'Project deleted' });
    } catch (error: any) {
      return serverError(error);
    }
  };
}
