import { Request } from 'express';
import * as DTO from '@/infra/http/dtos';
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
import { validate } from '@/infra/http/dtos/validate';

const userService = new UserService();
export class UserController {

  getMe = async (req: Request) => {
    try {
      const user = await userService.getMe(req.userId || '');
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
      const data = validate(DTO.CreateUserSchema, req.body);
      const userCreated = await userService.createUser(data);
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

  changeUserRole = async (req: Request) => {
    try {
      const data = validate(DTO.ChangeUserRoleSchema, {
        ...req.body,
        projectId: req.params.projectId,
      });

      const userProject = await userService.changeUserRole(data, req.userId || '');
      return ok(userProject);
    } catch (error: any) {
      if (error instanceof BadRequestError) {
        return badRequest(error.message);
      }
      if (error instanceof UnauthorizedError) {
        return unauthorized(error.message);
      }
      return serverError(error.message);
    }
  };

  authenticateUser = async (req: Request) => {
    try {
      const data = validate(DTO.AuthenticateUserSchema, req.body);
      const user = await userService.authenticateUser(data);
      return ok(user);
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

  forgotPassword = async (req: Request) => {
    try {
      const data = validate(DTO.ForgotPasswordSchema, req.body);
      const success = await userService.forgotPassword(data);
      return ok(success);
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

  verifyRecoveryCode = async (req: Request) => {
    try {
      const data = validate(DTO.VerifyRecoveryCodeSchema, req.body);
      const success = await userService.verifyRecoveryCode(data);
      return ok(success);
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

  resetPassword = async (req: Request) => {
    try {
      const data = validate(DTO.ResetPasswordSchema, req.body);
      const success = await userService.resetPassword(data);
      return ok(success);
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

  validateUser = async (req: Request) => {
    try {
      const data = validate(DTO.ValidateUserSchema, req.body);
      const success = await userService.validateUser(data);
      return ok(success);
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
      const data = validate(DTO.AddUserToProjectSchema, { ...req.body, projectId: req.params.projectId });
      
      const userProject = await userService.addUserToProject(data, req.userId || '');
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

 removeUserFromProject = async (req: Request) => {
    try {
      const data = validate(DTO.RemoveUserFromProjectSchema, { ...req.body, projectId: req.params.projectId });
      
      const userProject = await userService.removeUserFromProject(data, req.userId || '');
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

  public updateUser = async (req: Request) => {
    try {
      const data = validate(DTO.UpdateUserSchema, req.body);
      await userService.updateUser(req.userId || '', data);
      return ok({ message: 'User updated' });
    } catch (error: any) {
      if (
        error instanceof BadRequestError
      ) {
        return badRequest(error.message);
      }
      return serverError(error.message);
    }
  };
}
