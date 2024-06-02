import { Request, Response } from 'express';
import { Logger } from '@/util/logger/logger';
import { HttpResponse } from './response';
import { UserRole } from '@/entities';
const logger = Logger.getInstance();

export const responseHandler = (handler: any) => {
  return async (req: Request, res: Response) => {
    const httpResponse: HttpResponse = await handler(req);
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      const resourceAddress = `${req.protocol}://${req.hostname}:${req.socket.localPort}${req.originalUrl}`;
      logger.info(`${resourceAddress} ${httpResponse.statusCode}`);
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
        code: httpResponse.statusCode,
      });
    }
  };
};