import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import createErrorMessage from 'src/utils/functions';

interface IReturn {
  error: {
    message: string;
    errorCode: number;
  };
}

interface TokenPayload {
  sub: string;
}

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): IReturn | void {
  const { authorization } = req.headers;

  if (!authorization) {
    throw createErrorMessage(400, 'É necessário um token');
  }

  try {
    const { sub } = verify(
      authorization,
      authConfig.jwt.secret,
    ) as TokenPayload;
    req.user = {
      id: sub,
    };
    return next();
  } catch (error) {
    return {
      error: {
        message: 'Invalid jwt token.',
        errorCode: 400,
      },
    };
  }
}
