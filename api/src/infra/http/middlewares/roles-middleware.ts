import { Request, Response, NextFunction } from 'express';
import { isAdministrador, isColaborador, isProprietario } from '@/utils/authentication/permission';
import { IUserProject, IUserRole } from '@/models';

const userBelongsToProject = (userProjects: IUserProject[], projectId: String) => {
  
  return userProjects?.find((p: IUserProject) => p.project?.toString() == projectId);
}

export const observadorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const project = userBelongsToProject(req.projects as IUserProject[], req.params.projectId)
  
  if (!project) {
    return res.status(401).json({
      error: "You don't belong to this project.",
      code: 401,
    });
  }
  delete req.projects;
  next();
};

export const colabMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const project = userBelongsToProject(req.projects as IUserProject[], req.params.projectId)
  if (!project) {
    return res.status(401).json({
      error: "You don't belong to this project.",
      code: 401,
    });
  }
  const userRole = project.role as IUserRole;
  if (!isColaborador(userRole)) {
    return res.status(403).json({
      error: "You have no permission.",
      code: 403,
    });
  }
  delete req.projects;
  next();
};

export const administradorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const project = userBelongsToProject(req.projects as IUserProject[], req.params.projectId)
  if (!project) {
    return res.status(401).json({
      error: "You don't belong to this project.",
      code: 401,
    });
  }
  const userRole = project.role as IUserRole;
  
  if (!isAdministrador(userRole)) {
    return res.status(403).json({
      error: "You have no permission.",
      code: 403,
    });
  }
  delete req.projects;
  next();
};

export const proprietarioMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const project = userBelongsToProject(req.projects as IUserProject[], req.params.projectId)
  if (!project) {
    return res.status(401).json({
      error: "You don't belong to this project.",
      code: 401,
    });
  }
  const userRole = project.role as IUserRole;
  if (!isProprietario(userRole)) {
    return res.status(403).json({
      error: "You have no permission.",
      code: 403,
    });
  }
  delete req.projects;
  next();
}