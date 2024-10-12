import { Request } from 'express';
import * as DTO from '@/infra/http/dtos';
import { validate } from '@/utils/validation/validate';
import {
  badRequest,
  created,
  forbidden,
  ok,
  serverError,
  unauthorized,
} from '@/infra/http/response';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '@/utils/errors';
import { UserService } from '@/services';
import { ForbiddenError } from '@/utils/errors/forbidden-error';

const userService = new UserService();

export class UserController {

  getMe = async (req: Request) => {
    try {
      const user = await userService.getMe(req.userId);
      return ok(user);
    } catch (error: any) {
      if (
        error instanceof NotFoundError
      ) {
        return badRequest(error.message);
      }
      return serverError(error.message);
    }
  };

  createUser = async (req: Request) => {
    try {
      const user = new DTO.CreateUserRequestDTO(req.body);
      await validate(user);
      const userCreated = await userService.createUser(user);
      return created(userCreated);
    } catch (error: any) {
      if (
        error instanceof BadRequestError
      ) {
        return badRequest(error.message);
      }
      return serverError(error.message);
    }
  };

  authenticateUser = async (req: Request) => {
    try {
      const login = new DTO.AuthenticateUserRequestDTO(req.body);
      await validate(login);
      const user = await userService.authenticateUser(login);
      const logged = new DTO.AuthenticateUserResponseDTO(user);
      return ok(logged);
    } catch (error: any) {
      if (
        error instanceof BadRequestError
      ) {
        return badRequest(error.message);
      }
      if (error instanceof ForbiddenError) {
        return forbidden(error.message);
      }
      return serverError(error.message);
    }
  };

  addUserToProject = async (req: Request) => {
    try {
      const data = new DTO.AddUserToProjectRequestDTO({ ...req.body, projectId: req.params.projectId });
      await validate(data);
      const userProject = await userService.addUserToProject(data, req.userId);
      return ok(userProject);
    } catch (error: any) {
      if (
        error instanceof BadRequestError
      ) {
        return badRequest(error.message);
      }
      if (error instanceof UnauthorizedError) {
        return unauthorized(error.message);
      }
      return serverError(error.message);
    }
  };
}
