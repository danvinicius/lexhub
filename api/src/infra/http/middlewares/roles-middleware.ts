import { Request, Response, NextFunction } from 'express';
import { isAdmin, isCollaborator, isOwner } from '@/utils/validation/permission';
import { IUserProject } from '@/models';

const userBelongsToProject = (userProjects: IUserProject[], projectId: Number) => {
  return userProjects?.find((p: IUserProject) => p.project?.id == Number(projectId));
}

export const observerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const project = userBelongsToProject(req.projects as IUserProject[], Number(req.params.projectId))
  
  if (!project) {
    return res.status(401).json({
      error: "You don't belong to this project.",
      code: 401,
    });
  }
  delete req.projects;
  next();
};

export const collabMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const project = userBelongsToProject(req.projects as IUserProject[], Number(req.params.projectId))
  if (!project) {
    return res.status(401).json({
      error: "You don't belong to this project.",
      code: 401,
    });
  }
  const userRole = project.role;
  if (!isCollaborator(userRole)) {
    return res.status(403).json({
      error: "You have no permission.",
      code: 403,
    });
  }
  delete req.projects;
  next();
};

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const project = userBelongsToProject(req.projects as IUserProject[], Number(req.params.projectId))
  if (!project) {
    return res.status(401).json({
      error: "You don't belong to this project.",
      code: 401,
    });
  }
  const userRole = project.role;
  
  if (!isAdmin(userRole)) {
    return res.status(403).json({
      error: "You have no permission.",
      code: 403,
    });
  }
  delete req.projects;
  next();
};

export const ownerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const project = userBelongsToProject(req.projects as IUserProject[], Number(req.params.projectId))
  if (!project) {
    return res.status(401).json({
      error: "You don't belong to this project.",
      code: 401,
    });
  }
  const userRole = project.role;
  if (!isOwner(userRole)) {
    return res.status(403).json({
      error: "You have no permission.",
      code: 403,
    });
  }
  delete req.projects;
  next();
}