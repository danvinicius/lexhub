import { AUTH_SECRET } from '@/config/env';
import { JwtProvider } from '@/utils/security';
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
      error: 'Não autorizado',
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
    const jwt = new JwtProvider(AUTH_SECRET || '');
    const payload = (await jwt.decrypt(token)) as IUser;
    const id = payload?.id;

    if (!id) {
      return res.status(403).json({
        error: new ForbiddenError('Senha incorreta ou usuário inexistente').message,
        code: 403,
      });
    }
    
    const userService = new UserService();
    const user = await userService.getUser(id);

    if (!user) {
      return res.status(403).json({
        error: new ForbiddenError('Senha incorreta ou usuário inexistente').message,
        code: 403,
      });
    }
    
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
