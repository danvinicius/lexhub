import * as UseCases from "@/domain/use-cases";
import express, { Response, Request, NextFunction } from "express";
import * as DTO from "../dtos";
import { validate } from "../../helpers/validate";
import { Logger } from "@/config/logger";

export default function UserController(
  authenticateUser: UseCases.AuthenticateUser,
  createUser: UseCases.CreateUser
) {
  const router = express.Router();
  const logger = Logger.getInstance();

  router.post(
    "/register",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = new DTO.CreateUserRequestDTO(req.body);
        await validate(user)
        const userCreated = await createUser.execute(user);
        return res.status(201).json(userCreated);
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );

  // TODO: ajustar os códigos que estão retornando errado
  router.post(
    "/login",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const login = new DTO.AuthenticateUserRequestDTO(req.body);
        await validate(login)
        const user = await authenticateUser.execute(login);
        const logged = new DTO.AuthenticateUserResponseDTO(user)
        return res.status(200).json(logged);
      } catch (error: any) {
        logger.error(error);
        next(error);
      }
    }
  );

  return router;
}
