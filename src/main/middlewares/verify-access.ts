import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../presentation/errors/unauthorized-error";
import { badRequest } from "../../presentation/helpers/http-helper";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
export const verifyAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body, statusCode } = badRequest(new UnauthorizedError());

  try {
    const accessToken = req.headers.accesstoken as string;
    if (!accessToken) return res.status(statusCode).json(body);
    jwt.verify(accessToken, env.secret);

    next();
  } catch {
    return res.status(statusCode).json(body);
  }
};
