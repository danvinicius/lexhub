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
  ) {}

  public getAllProjects = async (req: Request) => {
    try {
      const projects = await this.getAllProjectsUseCase.execute();
      return ok(projects);
    } catch (error: any) {
      return serverError(error);
    }
  };

  public getProject = async (req: Request) => {
    try {
      const { id } = req.params;
      const project = await this.getProjectUseCase.execute(id);
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
      const project = new DTO.CreateProjectRequestDTO(req.body);
      await validate(project);
      const projectCreated = await this.createProjectUseCase.execute(project);
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
      const { id } = req.params;
      const project = new DTO.UpdateProjectRequestDTO(req.body);
      await validate(project);
      await this.updateProjectUseCase.execute({ id, project });
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
      const { id } = req.params;
      const projectExists = await this.getProjectUseCase.execute(id);
      if (!projectExists) {
        return notFound(new NotFoundError('This project does not exist'));
      }
      await this.deleteProjectUseCase.execute(id);
      return ok({ message: 'Project deleted' });
    } catch (error: any) {
      return serverError(error);
    }
  };
}
