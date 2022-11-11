import type { HttpResponse } from "../protocols/http";
import { ServerError } from "../errors/server-error";
import { UnauthorizedError } from "../errors/unauthorized-error";

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: { error: error.message },
});

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: { error: new ServerError().message },
});

export const ok = (data?: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const conflict = (error: Error): HttpResponse => ({
  statusCode: 409,
  body: { error: error.message },
});

export const unauthorized = (): HttpResponse => ({
  body: { error: new UnauthorizedError().message },
  statusCode: 401,
});
