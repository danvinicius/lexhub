import { HttpResponse } from "../protocols"
import { ServerError, UnauthorizedError } from '../errors'
import { Logger } from "@/config/logger";
const logger = Logger.getInstance();

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error
})

export const serverError = (error: Error): HttpResponse => {
  logger.error(error.stack ?? error.message);
  return {
    statusCode: 500,
    body: new ServerError(error.stack ?? error.message)
  }
}

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})
