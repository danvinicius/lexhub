import { Request, Response, NextFunction } from 'express';
import { ProjectService } from '@/services';

export const projectPrivacyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const projectId = req.params.projectId;
  
  if (!projectId) {
    return res.status(400).json({
      error: 'Project ID is required',
      code: 400,
    });
  }
  try {
    const projectService = new ProjectService();
    const isPrivate = await projectService.isProjectPrivate(projectId);

    if (isPrivate) {
      return next();
    }
    req.userId = null;
    
    return next('route');
  } catch (error) {
    return res.status(500).json({
      error: 'Error checking project privacy',
      code: 500,
    });
  }
};
