import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.statusCode);
  
  let statusCode = err?.statusCode || 400;
  res.status(statusCode).json({
    error: {
      name: err?.name,
      message: err?.message,
      statusCode: statusCode,
    },
  });
};

export { errorHandler };
