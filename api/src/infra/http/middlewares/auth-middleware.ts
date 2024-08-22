import { JwtService } from '@/infra/security';
import { IUser } from '@/models';
import { UserService } from '@/services';
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
    const payload = (await jwt.decrypt(token)) as IUser;
    const id = Number(payload?.id);
    const userService = new UserService();
    const user = await userService.getUser(id);
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
