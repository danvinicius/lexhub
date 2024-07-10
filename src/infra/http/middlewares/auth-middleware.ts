import { User } from '@/infra/db/models';
import { JwtService } from '@/infra/security';
import { Server } from '@/infra/server';
import { GetUserUseCase } from '@/use-cases/user/get-user';
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers?.authorization) {
    return res.status(401).json({
      error: 'Authentication must be provided',
      code: 401,
    });
  }
  try {
    const token = req.headers?.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        error: 'Invalid token',
        code: 401,
      });
    }
    const jwt = new JwtService(process.env.AUTH_SECRET);
    const payload = (await jwt.decrypt(token)) as User;
    const id = Number(payload?.id);
    const userRepository = Server.getInstance().getUserRepository();
    const getUserUseCase = new GetUserUseCase(userRepository);
    const user = await getUserUseCase.execute(id);
    req.user = id;
    req.projects = user.projects;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid token',
      code: 401,
    });
  }
};
