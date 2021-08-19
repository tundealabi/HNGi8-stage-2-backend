import HttpException from '../common/http-exception';
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.statusCode || error.status || 500;
  console.log(error);
  if (process.env.NODE_ENV === 'production') {
    return response.status(status).json({ message: 'Something went wrong!!' });
  }
  response.status(status).send(error);
};
