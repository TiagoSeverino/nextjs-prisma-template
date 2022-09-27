import { verify } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  BadRequestException,
  createMiddlewareDecorator,
  NextFunction,
  UnauthorizedException,
} from "next-api-decorators";
import AuthConfig from "../config/AuthConfig";

declare module "next" {
  interface NextApiRequest {
    user?: string;
  }
}

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const ensureAuthenticated = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new BadRequestException("Token is missing");

  const [, token] = authHeader.split(" ");

  if (!token) throw new BadRequestException("Token is missing");

  try {
    const decoded = verify(token, AuthConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    req.user = sub;

    return next();
  } catch {
    throw new UnauthorizedException("Invalid token");
  }
};

export default createMiddlewareDecorator(ensureAuthenticated);
