import { Request, Response } from 'express';
import { Logger } from '@/utils/logger/logger';
import { HttpResponse } from './response';

export const responseHandler = (handler: any) => {
  return async (req: Request, res: Response) => {
    const httpResponse: HttpResponse = await handler(req);
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      const resourceAddress = `${req.protocol}://${req.hostname}:${req.socket.localPort}${req.originalUrl}`;
      Logger.info(`${resourceAddress} ${httpResponse.statusCode}`);
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
        code: httpResponse.statusCode,
      });
    }
  };
};