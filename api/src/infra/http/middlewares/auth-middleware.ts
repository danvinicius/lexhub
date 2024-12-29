import { AUTH_SECRET } from '@/config/env';
import { JwtService } from '@/infra/security';
import { IUser } from '@/models';
import { UserService } from '@/services';
import { ForbiddenError } from '@/utils/errors/forbidden-error';
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers?.authorization) {
    return res.status(403).json({
      error: 'Authentication must be provided',
      code: 403,
    });
  }
  try {
    const token = req.headers?.authorization.split(' ')[1];
    
    if (!token) {
      return res.status(403).json({
        error: new ForbiddenError('Senha incorreta ou usuário inexistente').message,
        code: 403,
      });
    }
    const jwt = new JwtService(AUTH_SECRET);
    const payload = (await jwt.decrypt(token)) as IUser;
    const id = payload?.id;
    
    const userService = new UserService();
    const user = await userService.getUser(id);
    
    req.userId = user.id;
    req.projects = user.projects;
    next();
  } catch (error) {
    return res.status(401).json({
      error: new ForbiddenError('Senha incorreta ou usuário inexistente').message,
      code: 403,
    });
  }
};
