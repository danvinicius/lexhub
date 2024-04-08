import { Request, Response } from "express";
import { Logger } from '@/util/logger/logger'
import { HttpResponse } from "./response";
const logger = Logger.getInstance()
export const responseHandler = (handler: any) => {
  return async (req: Request, res: Response) => {
    const httpResponse: HttpResponse = await handler(req)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      logger.info(`${req.originalUrl} returned code ${httpResponse.statusCode}`)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
        code: httpResponse.statusCode
      })
    }
  }
}

