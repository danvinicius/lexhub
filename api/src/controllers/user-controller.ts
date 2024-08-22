import { Request } from 'express';
import * as DTO from '@/infra/http/dtos';
import { validate } from '@/utils/validation/validate';
import {
  badRequest,
  created,
  ok,
  serverError,
  unauthorized,
} from '@/infra/http/response';
import {
  BadRequestError,
  EmailInUseError,
  InvalidParamError,
  MissingParamError,
  UnauthorizedError,
} from '@/utils/errors';
import { UserService } from '@/services';

const userService = new UserService();

export class UserController {

  createUser = async (req: Request) => {
    try {
      const user = new DTO.CreateUserRequestDTO(req.body);
      await validate(user);
      const userCreated = await userService.createUser(user);
      return created(userCreated);
    } catch (error: any) {
      if (
        error instanceof InvalidParamError ||
        error instanceof EmailInUseError ||
        error instanceof MissingParamError
      ) {
        return badRequest(error);
      }
      return serverError(error);
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
        error instanceof InvalidParamError ||
        error instanceof MissingParamError
      ) {
        return badRequest(error);
      }
      if (error instanceof UnauthorizedError) {
        return unauthorized(error);
      }
      return serverError(error);
    }
  };

  addUserToProject = async (req: Request) => {
    try {
      const data = new DTO.AddUserToProjectRequestDTO({ ...req.body, projectId: Number(req.params.projectId) });
      await validate(data);
      const userProject = await userService.addUserToProject(data, req.user);
      return ok(userProject);
    } catch (error: any) {
      if (
        error instanceof InvalidParamError ||
        error instanceof MissingParamError ||
        error instanceof BadRequestError
      ) {
        return badRequest(error);
      }
      if (error instanceof UnauthorizedError) {
        return unauthorized(error);
      }
      return serverError(error);
    }
  };
}
