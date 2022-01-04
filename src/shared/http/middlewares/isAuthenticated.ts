import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

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
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('deu errado o token');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, authConfig.jwt.secret) as TokenPayload;
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
