import { isCelebrateError } from 'celebrate';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'joi';

const errorMiddleware = (
  error: any | undefined,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (error.statusCode) {
    const { statusCode, message } = error;
    return response.status(statusCode).json({ message });
  }
  if (isCelebrateError(error)) {
    const errorBody: ValidationError | undefined | any =
      error.details.get('body');
    const {
      details: [errorDetails],
    } = errorBody;

    return response.status(400).json({ message: errorDetails.message });
  }
  return response.status(500).json({ message: 'Internal server error' });
};

export default errorMiddleware;
