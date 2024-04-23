import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../presentation/errors/unauthorized-error";
import { badRequest } from "../../presentation/helpers/http-helper";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
export const verifyAccess = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const notNeedAccess = ["/key/message"];
  for (const path of notNeedAccess) {
    if (req.path.includes(path)) return next();
  }

  const { body, statusCode } = badRequest(new UnauthorizedError());

  try {
    const accessToken = req.headers.authorization as string;
    if (!accessToken) return res.status(statusCode).json(body);
    jwt.verify(accessToken, env.secret);

    const info = jwt.decode(accessToken) as any;
    req.accountId = info.sub;
    next();
  } catch {
    return res.status(statusCode).json(body);
  }
};
