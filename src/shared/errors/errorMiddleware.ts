import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (
  error: any,
  request: Request,
  response: Response,
  _next: NextFunction,
) => {
  if (error.statusCode) {
    const { statusCode, message } = error;
    return response.status(statusCode).json({ message });
  }
  return response.status(500).json({ message: 'Internal server error' });
};

export default errorMiddleware;
