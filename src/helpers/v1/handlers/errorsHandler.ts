import { Response, Request } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export const errorsHandler = (
  req: Request,
  res: Response,
  error: any
): object => {
  console.log(error);
  const errorCode: number = StatusCodes.INTERNAL_SERVER_ERROR;
  return res.status(errorCode).json({
    statusCode: errorCode,
    status: ReasonPhrases.INTERNAL_SERVER_ERROR,
  });
};
