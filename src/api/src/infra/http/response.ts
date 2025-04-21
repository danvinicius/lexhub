export interface HttpResponse {
  statusCode: number;
  body: any;
}

export const badRequest = (error: string): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});

export const unauthorized = (error: string): HttpResponse => ({
  statusCode: 401,
  body: error,
});

export const forbidden = (error: string): HttpResponse => ({
  statusCode: 403,
  body: error,
});

export const notFound = (error: string): HttpResponse => ({
  statusCode: 404,
  body: error,
});

export const serverError = (error: string): HttpResponse => ({
  statusCode: 500,
  body: error,
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
});
