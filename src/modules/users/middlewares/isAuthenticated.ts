import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface IReturn {
  error: {
    message: string;
    statusCode: number;
  };
}

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): IReturn {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return {
      error: {
        message: 'Jwt token is missing',
        statusCode: 400,
      },
    };
  }
  const [, token] = authHeader.split(' ');

  try {
    const decodeToken = verify(token, authConfig.jwt.secret);

    return next();
  } catch (error) {
    return {
      error: {
        message: 'Invalid jwt token.',
        statusCode: 400,
      },
    };
  }
}
