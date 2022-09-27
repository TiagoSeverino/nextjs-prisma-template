import { NextApiRequest, NextApiResponse } from "next";
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "next-api-decorators";

function exceptionHandler(
  error: unknown,
  req: NextApiRequest,
  res: NextApiResponse
) {
  let status = 500;

  if (error && error.constructor)
    switch (error.constructor) {
      case NotFoundException:
        status = 404;
        break;
      case BadRequestException:
        status = 400;
        break;
      case UnauthorizedException:
        status = 401;
        break;
      case ForbiddenException:
        status = 403;
        break;
      case ConflictException:
        status = 409;
        break;
      case InternalServerErrorException:
      default:
        status = 500;
        break;
    }

  const message =
    error instanceof Error ? error.message : "An unknown error occurred.";
  res.status(status).json({ success: false, error: message });
}

export default exceptionHandler;
